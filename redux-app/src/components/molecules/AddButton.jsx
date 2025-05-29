import {
	Box,
	Button,
	Fab,
	Modal,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

const AddButton = ({ send }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [title, setTitle] = useState(null);
	const [description, setDescription] = useState(null);

	const [timeCompletion, setTimeCompletion] = useState(null);

	return (
		<Box >
			<Fab onClick={handleOpen} color="primary" aria-label="add" title="Add task">
				<AddIcon />
			</Fab>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<TextField
						label="Task"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextField
						label="Description"
						onChange={(e) => setDescription(e.target.value)}
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
							value={timeCompletion}
							
							slotProps={{
								actionBar: {
									actions: ["clear", 'accept'],
								},
							}}
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
								seconds: renderTimeViewClock,
							}}
							onChange={(newTime) => setTimeCompletion(newTime)}
							minDateTime={new Date()}
						/>
					</LocalizationProvider>

					<Button
						color="primary"
						variant="contained"
						onClick={() => {
							send(title, description, timeCompletion);
							handleClose();
							setTitle(null)
							setDescription(null)
							setTimeCompletion(null)
						}}
					>
						send
					</Button>
				</Box>
			</Modal>
		</Box>
	);
};

export default AddButton;
