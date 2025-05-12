const initialValue = {
	data: [],
};

export const tasksDataReducer = (state = initialValue, action) => {
	switch (action.type) {
		case "ADD_TASK":
			return { ...state, data: action.payload };
		case "DELETE_TASK":
			return {
				...state,
				data: state.data.filter((item) => item.id != action.payload),
			};
		case "DELETE_ALL_TASKS":
			return {
				...state,
				data: [],
			};
		case "EDIT_TASK":
			return { ...state, data: action.payload };

		default:
			return state;
	}
};
