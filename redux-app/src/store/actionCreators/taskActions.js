import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const [id, setId] = useState(1);

const [timeDif, setTimeDif] = useState(10);

export const addTask = () => {
	setId(id + 1);

	const text = prompt("Input your task...") || "SAMPLE TEXT";

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

export const deleteTask = (id) => {
	dispatch({ type: "DELETE_TASK", payload: id });
};

export const deleteAllTasks = () => {
	dispatch({ type: "DELETE_ALL_TASKS" });
	setId(1);
};

export const editTask = (id) => {
	data.map((item) => {
		if (item.id == id) item.text = prompt("Input new text...");
		return item;
	});
	dispatch({ type: "EDIT_TASK", payload: data });
};

export const taskDone = (id) => {
	data.map((item) => {
		if (item.id == id && !item.done) item.done = true;

		return item;
	});
	dispatch({ type: "EDIT_TASK", payload: data });
};
