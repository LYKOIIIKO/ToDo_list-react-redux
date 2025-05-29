import "./App.css";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import Header from "./components/organisms/Header";
import { BrowserRouter } from "react-router";
import Layout from "./components/organisms/Layout";

function App() {
	/** @type {import("../../store/reducers/userSlice/userSlice").UserReducer} */
	const userState = useSelector((state) => state.user);

	const { user } = userState;

	return (
		<>
			<BrowserRouter>
				<Container maxWidth="lg">
					<Box>
						<Header />
						{user && <Layout />}
					</Box>
				</Container>
			</BrowserRouter>
		</>
	);
}

export default App;
