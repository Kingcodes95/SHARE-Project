import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchClients from "./data";
import "./DataCenter.css";

export default function DataCenter({ searchQuery }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients()
      .then(data => setClients(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const filtered = clients.filter(user =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
