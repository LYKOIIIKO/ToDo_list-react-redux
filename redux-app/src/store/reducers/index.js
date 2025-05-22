import { combineReducers } from "redux";
import { tasksDataReducer } from "./tasksDataReducer";

export const rootReducer = combineReducers({
	data: tasksDataReducer,
});
