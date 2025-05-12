const initialValue = {
	id: 0,
	text: "",
	timeStart: 0,
	timeFinish: 0,
	done: false,
	expired: false,
};

export const taskReducer = (state = initialValue, action) => {
	switch (action.type) {
		case "BLA_BLA":
			return { ...state, id: state.id+=1, text: action.payload };

		default:
			return state;
	}
}