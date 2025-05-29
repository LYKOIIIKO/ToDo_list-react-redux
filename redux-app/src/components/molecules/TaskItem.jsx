import { Timestamp } from "firebase/firestore";
import TimerElem from "../atoms/timerElem";
import {
	Box,
	Button,
	ButtonGroup,
	Checkbox,
	Chip,
	Grid,
	ListItem,
	Modal,
	TextField,
	Typography,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useState } from "react";
import {
	DateTimePicker,
	LocalizationProvider,
	renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ru } from "date-fns/locale";
import { ruRU } from "@mui/x-date-pickers/locales";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	gap: "15px",
};

const TaskItem = ({
	id,
	title,
	description,
	timeCompletion,
	done,
	setDone,
	expired,
	status,
	createdAt,
	edit,
	del,
}) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [titleValue, setTitleValue] = useState(title || null);
	const [descriptionValue, setDescriptionValue] = useState(
		description || null
	);
	const [timeCompletionValue, setTimeCompletionValue] = useState(
		timeCompletion?.toDate() || null
	);

	return (
		<ListItem
			key={id}
			sx={[
				{
					userSelect: "none",
					border: 1,
					borderColor: "#999",
					borderRadius: 10,
					mb: 1,
				},
				expired && { backgroundColor: "lightcoral" },
				done && { backgroundColor: "lightgreen" },
			]}
		>
			<Grid
				container
				spacing={1}
				rowSpacing={{ xs: 1 }}
				size="grow"
				sx={{
					alignItems: "center",
				}}
			>
				<Grid
					size={{ xs: 2, sm: "auto" }}
					onClick={() => setDone(id, done)}
				>
					<Checkbox
						checked={done}
						icon={<CheckCircleOutlineRoundedIcon />}
						checkedIcon={<CheckCircleRoundedIcon />}
					/>
				</Grid>
				<Grid
					size={{ xs: 10, md: "grow" }}
					onClick={() => setDone(id, done)}
					sx={{ cursor: "pointer" }}
				>
					<Typography variant="h6" sx={{ wordWrap: "break-word" }}>
						{title}
					</Typography>
					<Typography
						variant="subtitle1"
						sx={{ wordWrap: "break-word" }}
					>
						{description}
					</Typography>
				</Grid>
				<Grid size={{ xs: 6, sm: "auto" }}>
					{createdAt && (
						<Typography variant="body1">
							to: {createdAt.toDate().toLocaleDateString()}
						</Typography>
					)}
					{timeCompletion && (
						<Typography variant="body1">
							do: {timeCompletion.toDate().toLocaleDateString()}
						</Typography>
					)}
				</Grid>
				<Grid size={{ xs: 6, sm: "grow", md: 1.8 }}>
					{timeCompletion && !done && (
						<TimerElem
							id={id}
							time={
								timeCompletion.seconds - Timestamp.now().seconds
							}
							stop={done}
						/>
					)}
				</Grid>
				<Grid size={{ xs: 5, sm: "auto" }}>
					{status == "active" && !done && !expired && (
						<Chip label="active" color="success" />
					)}
					{status == "created" && !done && !expired && (
						<Chip label="created" color="primary" />
					)}
					{done && <Chip label="done" color="secondary" />}
					{expired && !done && <Chip label="expired" color="error" />}
				</Grid>
				<Grid size={{ xs: 7, sm: "auto" }}>
					<ButtonGroup>
						<Button
							variant="contained"
							color="success"
							onClick={handleOpen}
						>
							EDIT
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={() => {
								del(id);
							}}
						>
							DEL
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<TextField
						label="Task"
						onChange={(e) => setTitleValue(e.target.value)}
						value={titleValue}
					/>
					<TextField
						label="Description"
						onChange={(e) => setDescriptionValue(e.target.value)}
						value={descriptionValue}
					/>
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
							defaultValue={timeCompletionValue}
							slotProps={{
								actionBar: {
									actions: ["clear", "accept"],
								},
							}}
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
								seconds: renderTimeViewClock,
							}}
							onChange={(newTime) => {
								setTimeCompletionValue(newTime);
							}}
							minDateTime={new Date()}
						/>
					</LocalizationProvider>

					<Button
						color="primary"
						variant="contained"
						onClick={() => {
							if (
								!timeCompletion ||
								timeCompletion?.toDate() <
									timeCompletionValue ||
								timeCompletionValue == null
							) {
								edit(
									id,
									titleValue,
									descriptionValue,
									timeCompletionValue
								);
								handleClose();
							}
						}}
					>
						send
					</Button>
				</Box>
			</Modal>
		</ListItem>
	);
};
export default TaskItem;
