import { Avatar, Box, Button, Typography } from "@mui/material";
import {
	googleAuth,
	userSlice,
} from "../../store/reducers/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../fb/initial";

const UserLogin = ({ user }) => {
	const dispatch = useDispatch();

	const logOut = () => {
		signOut(auth);
		dispatch(userSlice.actions.clearUser());
	};
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: "15px",
					border: 1,
					borderColor: "#999",
					borderRadius: 5,
					p: 1,
				}}
			>
				{user ? (
					<>
						<Avatar src={user.photoURL} alt={user.displayName} />
						<Typography variant="body1" textTransform={"uppercase"}>
							{user.displayName}
						</Typography>
					</>
				) : (
					<Typography variant="body1" textTransform={"uppercase"}>
						Please login
					</Typography>
				)}
			</Box>
			<Box>
				{!user && (
					<Button
						variant="contained"
						color="success"
						onClick={() => dispatch(googleAuth())}
					>
						Login
					</Button>
				)}
				{user && (
					<Button variant="contained" color="info" onClick={logOut}>
						Logout
					</Button>
				)}
			</Box>
		</Box>
	);
};
export default UserLogin;
