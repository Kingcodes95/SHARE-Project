// src/pages/PersonDetail.jsx
import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../components/DataCenter/data";

export default function PersonDetail() {
	const { id } = useParams();
	const location = useLocation();
	const [user, setUser] = useState(location.state?.user ?? null);

	useEffect(() => {
		if (!user) {
			const found = data.find((p) => p.id === parseInt(id, 10));
			setUser(found ?? undefined);
		}
	}, [id, user]);

	if (user === undefined) {
		return (
			<div style={{ padding: "2rem" }}>
				<Link to="/data">← Back</Link>
				<p>User not found.</p>
			</div>
		);
	}
	if (!user) {
		return <p>Loading…</p>;
	}

	return (
		<div style={{ padding: "2rem" }}>
			<Link to="/data">← Back to list</Link>
			<h1>
				{user.firstName} {user.lastName}
			</h1>
			<p>
				<strong>Last pick up:</strong> {user.lastPickUp}
			</p>
			<p>
				<strong>Phone:</strong> {user.phone}
			</p>
			<p>
				<strong>Notes:</strong> {user.notes || "—"}
			</p>
		</div>
	);
}
