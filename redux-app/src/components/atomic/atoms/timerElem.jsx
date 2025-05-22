import { useTimer } from "../../../shared/hooks";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../fb/initial";

const TimerElem = (props) => {
	const timer = useTimer(props.time, () => expiredTask(props.id));

	const expiredTask = async (id) => {
		const docRef = doc(db, "tasks", id);

		await updateDoc(docRef, {
			expired: true,
		});
	};

	useEffect(() => {
		if (props.stop) timer.clear();
	}, [props]);

	return (
		<Typography>
			{" "}
			<code>
				{String(timer.hours).padStart(2, "0")}:
				{String(timer.minutes).padStart(2, "0")}:
				{String(timer.seconds).padStart(2, "0")}
			</code>
		</Typography>
	);
};

export default TimerElem;
