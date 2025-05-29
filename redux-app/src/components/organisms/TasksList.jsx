import { Box, Chip, List, Typography } from "@mui/material";
import TaskItem from "../molecules/TaskItem";
import {
	collection,
	deleteDoc,
	doc,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { db } from "../../fb/initial";
import styles from './TasksList.module.css'

const TasksList = (props) => {
	/** @type {import("../../store/reducers/userSlice/userSlice").UserReducer} */
	const userState = useSelector((state) => state.user);

	const { user } = userState;

	const [tasks, setTasks] = useState([]);

	const [data] = useCollection(
		query(collection(db, "tasks"), [
			orderBy("createdAt"),
			where("uid", "==", user?.uid),
		])
	);

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
		const docRef = doc(db, "tasks", id);
		try {
			await deleteDoc(docRef);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const editTask = async (id, title, desc, time) => {
		const docRef = doc(db, "tasks", id);

		if (title || desc) {

			await updateDoc(docRef, {
				title: title,
				description: desc,
				timeCompletion: time,
				expired: false,
			});
		}
		if (time) {
			await updateDoc(docRef, {
				
				status:'active'
			});
		} else {
			await updateDoc(docRef, {
				
				status:'created'
			});
		}
	};

	const doneTask = async (id, status) => {
		const docRef = doc(db, "tasks", id);

		if (!status) {
			await updateDoc(docRef, {
				done: true,
			});
		} else {
			await updateDoc(docRef, {
				done: false,
			});
		}
	};

	return (
		<>
			{tasks.length == 1 && (
				<Typography className={styles.textGradientAnim} variant="h4" justifyContent={'center'}>Add new task!</Typography>
			) }
			{tasks.length > 1 && props.status == "all" && (
				<Box>
					<Box>
						<Chip
							label="created"
							color="primary"
							sx={{ zoom: "1.4", mb: 1 }}
						/>
						<List sx={{ borderTop: "1px solid #999" }}>
							{tasks?.map((item) => {
								if (item.status == "created" && !item.done) {
									return (
										<TaskItem
											key={item.id}
											id={item.id}
											displayName={item.displayName}
											timeCompletion={item.timeCompletion}
											done={item.done}
											title={item.title}
											description={item.description}
											expired={item.expired}
											status={item.status}
											createdAt={item.createdAt}
											edit={editTask}
											del={deleteTask}
											setDone={doneTask}
										/>
									);
								}
							})}
						</List>
					</Box>
					<Box>
						<Chip
							label="active"
							color="success"
							sx={{ zoom: "1.4", mb: 1 }}
						/>

						<List sx={{ borderTop: "1px solid #999" }}>
							{tasks?.map((item) => {
								if (item.status == "active" && !item.done) {
									return (
										<TaskItem
											key={item.id}
											id={item.id}
											displayName={item.displayName}
											timeCompletion={item.timeCompletion}
											done={item.done}
											title={item.title}
											description={item.description}
											expired={item.expired}
											status={item.status}
											createdAt={item.createdAt}
											edit={editTask}
											del={deleteTask}
											setDone={doneTask}
										/>
									);
								}
							})}
						</List>
					</Box>
					<Box>
						<Chip
							label="done"
							color="secondary"
							sx={{ zoom: "1.4", mb: 1 }}
						/>

						<List sx={{ borderTop: "1px solid #999" }}>
							{tasks?.map((item) => {
								if (item.done) {
									return (
										<TaskItem
											key={item.id}
											id={item.id}
											displayName={item.displayName}
											timeCompletion={item.timeCompletion}
											done={item.done}
											title={item.title}
											description={item.description}
											expired={item.expired}
											status={item.status}
											createdAt={item.createdAt}
											edit={editTask}
											del={deleteTask}
											setDone={doneTask}
										/>
									);
								}
							})}
						</List>
					</Box>
				</Box>
			)}
			{tasks.length > 1 && props.status == "created" && (
				<Box>
					<Chip
						label="created"
						color="primary"
						sx={{ zoom: "1.4", mb: 1 }}
					/>
					<List sx={{ borderTop: "1px solid #999" }}>
						{tasks?.map((item) => {
							if (item.status == "created" && !item.done) {
								return (
									<TaskItem
										key={item.id}
										id={item.id}
										displayName={item.displayName}
										timeCompletion={item.timeCompletion}
										done={item.done}
										title={item.title}
										description={item.description}
										expired={item.expired}
										status={item.status}
										createdAt={item.createdAt}
										edit={editTask}
										del={deleteTask}
										setDone={doneTask}
									/>
								);
							}
						})}
					</List>
				</Box>
			)}
			{tasks.length > 1 && props.status == "active" && (
				<Box>
					<Chip
						label="active"
						color="success"
						sx={{ zoom: "1.4", mb: 1 }}
					/>

					<List sx={{ borderTop: "1px solid #999" }}>
						{tasks?.map((item) => {
							if (item.status == "active" && !item.done) {
								return (
									<TaskItem
										key={item.id}
										id={item.id}
										displayName={item.displayName}
										timeCompletion={item.timeCompletion}
										done={item.done}
										title={item.title}
										description={item.description}
										expired={item.expired}
										status={item.status}
										createdAt={item.createdAt}
										edit={editTask}
										del={deleteTask}
										setDone={doneTask}
									/>
								);
							}
						})}
					</List>
				</Box>
			)}
			{tasks.length > 1 && props.status == "done" && (
				<Box>
					<Chip
						label="done"
						color="secondary"
						sx={{ zoom: "1.4", mb: 1 }}
					/>

					<List sx={{ borderTop: "1px solid #999" }}>
						{tasks?.map((item) => {
							if (item.done) {
								return (
									<TaskItem
										key={item.id}
										id={item.id}
										displayName={item.displayName}
										timeCompletion={item.timeCompletion}
										done={item.done}
										title={item.title}
										description={item.description}
										expired={item.expired}
										status={item.status}
										createdAt={item.createdAt}
										edit={editTask}
										del={deleteTask}
										setDone={doneTask}
									/>
								);
							}
						})}
					</List>
				</Box>
			)}
		</>
	);
};

export default TasksList;
