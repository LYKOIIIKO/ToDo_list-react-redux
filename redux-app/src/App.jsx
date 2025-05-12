import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
	TextField,
	Typography,
} from "@mui/material";
import CrudBasic from "./components/atomic/layout/CrudMUI";

function App() {
	const { data } = useSelector((state) => state.data);

	const dispatch = useDispatch();

	const [id, setId] = useState(1);

	const [timeDif, setTimeDif] = useState(10);

	const addTask = () => {
		setId(id + 1);

		const text = prompt("Input your task...");

		const dateNow = new Date();

		const timeFinish = dateNow.getTime() / 1000 + 10;

		// const timeDif = Math.abs(dateNow.getTime() / 1000 - timeFinish);

		data.push({
			id: id,
			text: text,
			timeStart: dateNow.getTime() / 1000,
			timeFinish: timeFinish,
			timeDif: timeDif,
			done: false,
			expired: false,
		});
		dispatch({
			type: "ADD_TASK",
			payload: data,
		});
	};

	const deleteTask = (id) => {
		dispatch({ type: "DELETE_TASK", payload: id });
	};

	const deleteAllTasks = () => {
		dispatch({ type: "DELETE_ALL_TASKS" });
		setId(1);
	};

	const editTask = (id) => {
		data.map((item) => {
			if (item.id == id) item.text = prompt("Input new text...");
			return item;
		});
		dispatch({ type: "EDIT_TASK", payload: data });
	};

	const taskDone = (id) => {
		data.map((item) => {
			if (item.id == id && !item.done) item.done = true;

			return item;
		});
		dispatch({ type: "EDIT_TASK", payload: data });
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
							<Button
								variant="contained"
								onClick={() => addTask()}
							>
								+
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={() => deleteAllTasks()}
							>
								CLEAR
							</Button>
						</ButtonGroup>
						<TextField
							id="timeDif"
							label="How many sec do you need?"
							variant="standard"
							type="number"
							onChange={(event) => {
								setTimeDif(event.target.value);
							}}
						/>
					</Box>
					<List>
						{data.map((item) => (
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
								<TimerElem
									id={item.id}
									time={item.timeDif}
									stop={item.done}
								/>

								<Typography onClick={() => taskDone(item.id)}>
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
										onClick={() => editTask(item.id)}
									>
										EDIT
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() => deleteTask(item.id)}
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
