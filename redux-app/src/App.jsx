import { useEffect, useState } from "react";
import TimerElem from "./components/atomic/atoms/timerElem";
import "./App.css";
import {
	Box,
	Button,
	ButtonGroup,
	Checkbox,
	Container,
	List,
	ListItem,
	Typography,
} from "@mui/material";

import { useCollection } from "react-firebase-hooks/firestore";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { db } from "./fb/initial";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale";
import { ruRU } from "@mui/x-date-pickers/locales";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

function App() {
	// const {addTask, deleteAllTasks, editTask, taskDone, deleteTask} = useAction()

	//firebase
	// /** @type {import("../../store/reducers/userSlice/userSlice").UserReducer} */
	// const userState = useSelector(state => state.user)
	// const { user } = userState

	const [tasks, setTasks] = useState([]);
	const [timeCompletion, setTimeCompletion] = useState(null);

	const [data, loading, error] = useCollection(
		// query(collection(db, 'chat'), [orderBy('createAt'), where('uid', '==', user.uid)])
		query(collection(db, "tasks"), orderBy("createdAt"))
	);

	const sendTask = async () => {
		const textTask = prompt("Input your task...") || "TEXT";

		await addDoc(collection(db, "tasks"), {
			text: textTask,
			createdAt: serverTimestamp(),
			timeCompletion: timeCompletion,
			done: false,
			expired: false,
		});
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
		const docRef = doc(db, "tasks", id);
		try {
			await deleteDoc(docRef);
		} catch (error) {
			console.error("Ошибка при удалении документа:", error);
		}
	};

	const deleteAllTasks = () => {
		tasks.map((item) => {
			deleteTask(item.id);
		});
	};

	const editTask = async (id) => {
		const docRef = doc(db, "tasks", id);
		const newTask = prompt("Введите новое значение");

		if (!!newTask)
			await updateDoc(docRef, {
				text: newTask,
			});
	};

	const doneTask = async (id) => {
		const docRef = doc(db, "tasks", id);

		await updateDoc(docRef, {
			done: true,
		});
	};

	return (
		<>
			<Container>
				<Box>
					<Box
						sx={{
							display: "flex",
							gap: "50px",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography variant="h1">ToDo List</Typography>
						<ButtonGroup>
							<Button variant="contained" onClick={sendTask}>
								+
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={deleteAllTasks}
							>
								CLEAR
							</Button>
						</ButtonGroup>
						<LocalizationProvider
							dateAdapter={AdapterDateFns}
							adapterLocale={ru}
							localeText={
								ruRU.components.MuiLocalizationProvider
									.defaultPropslocaleText
							}
						>
							<DateTimePicker
								name="timeCompletion"
								value={timeCompletion}
								viewRenderers={{
									hours: renderTimeViewClock,
									minutes: renderTimeViewClock,
									seconds: renderTimeViewClock,
								}}
								onChange={(newTime) =>
									setTimeCompletion(newTime)
								}
								minDateTime={new Date()}
							/>
						</LocalizationProvider>
					</Box>
					<List>
						{tasks?.map((item) => (
							<ListItem
								key={item.id}
								sx={[
									{
										userSelect: "none",
										display: "flex",
										justifyContent: "center",
									},
									item.expired && { backgroundColor: "red" },
									item.done && { backgroundColor: "green" },
								]}
							>
								{item.timeCompletion && (
									<TimerElem
										id={item.id}
										time={
											item.timeCompletion.seconds -
											Timestamp.now().seconds
										}
										stop={item.done}
									/>
								)}
								<Typography onClick={() => doneTask(item.id)}>
									<Checkbox
										checked={item.done}
										inputProps={{
											"aria-label": "controlled",
										}}
									/>
									{item.text}
								</Typography>
								<ButtonGroup>
									<Button
										variant="contained"
										color="success"
										onClick={() => {
											editTask(item.id);
										}}
									>
										EDIT
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() => {
											deleteTask(item.id);
										}}
									>
										DEL
									</Button>
								</ButtonGroup>
							</ListItem>
						))}
					</List>
				</Box>
			</Container>
		</>
	);
}

export default App;
