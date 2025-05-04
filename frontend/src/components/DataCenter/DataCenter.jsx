import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchClients } from "./data";
import "./DataCenter.css";

export default function DataCenter({ searchQuery }) {
	const {
		data: clients = [],
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["clients"],
		queryFn: fetchClients,
		staleTime: 1000 * 60 * 5,
	});

	const filtered = clients.filter(user =>
		`${user.firstName} ${user.lastName}`
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	if (isLoading) return <p>Loading…</p>;
	if (isError) return <p style={{ color: "red" }}>{error.message}</p>;

	return (
		<div className="scroll-box-container">
			<ul>
				{filtered.map(user => (
					<li key={user.id}>
						<Link
							to={`/data/${user.id}`}
							state={{ user }}
							className="user-tile"
						>
							<div className="scroll-box-name">
								<h4>{user.firstName} {user.lastName}</h4>
							</div>
							<div className="pick-up-status">
								<h4>Last pick up:</h4>
								<h4>{user.last_pick_up}</h4>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
