import "./LogoutButton.css";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		const accessToken = localStorage.getItem("access_token");
		const refreshToken = localStorage.getItem("refresh_token");

		if (!accessToken || !refreshToken) {
			navigate("/login");
		}
		try {
			const response = await fetch("http://localhost:8000/auth/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ refresh_token: refreshToken }),
			});

			if (!response.ok) {
				const err = await response.json();
				throw new Error(err.detail || "Logout failed");
			}

			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");

			navigate("/login");
		} catch (err) {
			console.error("Logout error:", err);
		}
	};

	return (
		<div className="logout-button-div">
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}

export default LogoutButton;
