export async function fetchClients() {
	const token = localStorage.getItem("access_token");
	const res = await fetch("http://localhost:8000/clients", {
		headers: {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : undefined,
		},
	});
	if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
	return res.json();
}
