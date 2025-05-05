import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import PeoplesData from "./pages/PeoplesData";
import ProtectedRoute from "./components/ProtectedRoute.jsx/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Admin from "./pages/Admin";
import PersonDetail from "./pages/PeopleDetail";
import New_Client from "./pages/New_Client";

function App() {
	// function TokenCleanup() {
	// 	useEffect(() => {
	// 		const handleUnload = () => {
	// 			localStorage.removeItem("access_token");
	// 			localStorage.removeItem("refresh_token");
	// 		};

	// 		window.addEventListener("beforeunload", handleUnload);

	// 		return () => {
	// 			window.removeEventListener("beforeunload", handleUnload);
	// 		};
	// 	}, []);

	// 	return null;
	// }

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/data"
						element={
							<ProtectedRoute roles={["volunteer", "admin", "super_admin"]}>
								<PeoplesData />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/data/:id"
						element={
							<ProtectedRoute roles={["volunteer", "admin", "super_admin"]}>
								<PersonDetail />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute roles={["admin", "super_admin"]}>
								<Admin />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/new_client"
						element={
							<ProtectedRoute roles={["volunteer", "admin", "super_admin"]}>
								<New_Client />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
