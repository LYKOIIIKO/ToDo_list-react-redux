import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "../../../shared/hooks";
import { useEffect } from "react";

const TimerElem = (props) => {
	const { data } = useSelector((state) => state.data);

	const dispatch = useDispatch();

	const editTask = (id) => {
		data.map((item) => {
			if (item.id == id) item.expired = true;
			return item;
		});
		dispatch({ type: "EDIT_TASK", payload: data });
	};

	const timer = useTimer(props.time, () => editTask(props.id));

	useEffect(() => {
		if (props.stop) timer.clear();
	}, [props]);

	return (
		<p>
			{" "}
			<code>
				{String(timer.hours).padStart(2, "0")}:
				{String(timer.minutes).padStart(2, "0")}:
				{String(timer.seconds).padStart(2, "0")}
			</code>
		</p>
	);
};

export default TimerElem;
