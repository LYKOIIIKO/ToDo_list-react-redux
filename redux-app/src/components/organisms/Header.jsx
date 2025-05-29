import { Box, Grid, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { db } from "../../fb/initial";

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	orderBy,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import Logo from "../../assets/logo.svg?react";
import UserLogin from "../molecules/UserLogin";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Filter from "../molecules/Filter";
import AddButton from "../molecules/AddButton";

const Header = () => {
	/** @type {import("../../store/reducers/userSlice/userSlice").UserReducer} */
	const userState = useSelector((state) => state.user);

	const { user } = userState;

	const [tasks, setTasks] = useState([]);

	const [data] = useCollection(
		query(collection(db, "tasks"), [
			where("uid", "==", user?.uid),
			orderBy("createdAt"),
		])
	);

	const sendTask = async (title, description, timeCompletion) => {
		if (title || description) {
			await addDoc(collection(db, "tasks"), {
				uid: user.uid,
				displayName: user.displayName,
				title: title,
				description: description,
				createdAt: serverTimestamp(),
				timeCompletion: timeCompletion,
				done: false,
				expired: false,
				status: timeCompletion ? "active" : "created",
			});
		}
	};

	useEffect(() => {
		const newTasks = [];
		data?.forEach((item) => {
			const task = {
				id: item.id,
				...item.data(),
			};
			newTasks.push(task);
		});
		setTasks(newTasks);
	}, [data]);

	const deleteTask = async (id) => {
		if (id != "NODELETE") {
			const docRef = doc(db, "tasks", id);
			try {
				await deleteDoc(docRef);
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};

	const deleteAllTasks = () => {
		tasks.map((item) => {
			deleteTask(item.id);
		});
	};

	return (
		<Box sx={{ mb: 2 }}>
			<Grid
				container
				sx={{
					alignItems: "center",
				}}
				justifyContent={{ xs: "center", sm: "space-between" }}
				mb={1}
			>
				<Grid>
					<Logo />
				</Grid>
				<Grid>
					<UserLogin user={user} />
				</Grid>
			</Grid>
			{user && (
				<Grid
					container
					justifyContent={{ xs: "flex-end", md: "space-between" }}
					alignItems={"center"}
					spacing={1}
				>
					<Grid size={{ xs: "12", md: "auto" }}>
						<Filter />
					</Grid>
					<Grid container spacing={3}>
						<Grid>
							<AddButton send={sendTask} />
						</Grid>
						<Grid>
							<IconButton
								onClick={deleteAllTasks}
								title="Delete all tasks"
							>
								<DeleteForeverRoundedIcon
									color="error"
									fontSize="large"
								/>
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			)}
		</Box>
	);
};

export default Header;
