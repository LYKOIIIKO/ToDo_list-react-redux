import { combineReducers } from "redux";
import { taskReducer } from "./taskReduser";
import { tasksDataReducer } from "./tasksDataReducer";

export const rootReducer = combineReducers({
	task: taskReducer,
	data: tasksDataReducer,
});
