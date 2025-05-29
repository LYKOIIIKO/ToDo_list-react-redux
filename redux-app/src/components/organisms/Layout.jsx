import { Routes, Route } from "react-router";
import TasksList from "./TasksList";
import { Typography } from "@mui/material";

const Layout = () => {
	return (
		<Routes>
			<Route index path="/" element={<TasksList status={"all"} />} />
			<Route path="/created" element={<TasksList status={"created"} />} />
			<Route path="/active" element={<TasksList status={"active"} />} />
			<Route path="/done" element={<TasksList status={"done"} />} />
			<Route
				path="*"
				element={<Typography variant="h1">404 error</Typography>}
			/>
		</Routes>
	);
};

export default Layout;
