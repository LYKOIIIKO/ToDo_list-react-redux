import { Chip, Grid, TextField } from "@mui/material";
import { NavLink } from "react-router";

const Filter = () => {
	return (
		<Grid container spacing={1} alignItems={"center"}>
			{/* <Grid size={{ xs: 12, sm: "auto" }}>
				<TextField size="small" sx={{ width: "100%" }} />
			</Grid> */}
			<Grid>
				<NavLink to={"/"}>
					<Chip label="all" color="warning" />
				</NavLink>
			</Grid>
			<Grid>
				<NavLink to={"/created"}>
					<Chip label="created" color="primary" />
				</NavLink>
			</Grid>
			<Grid>
				<NavLink to={"/active"}>
					<Chip label="active" color="success" />
				</NavLink>
			</Grid>
			<Grid>
				<NavLink to={"/done"}>
					<Chip label="done" color="secondary" />
				</NavLink>
			</Grid>
			
		</Grid>
	);
};

export default Filter;
