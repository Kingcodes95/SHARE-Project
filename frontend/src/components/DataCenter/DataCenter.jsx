import "./DataCenter.css";
import data from "./data";
import { Link } from "react-router-dom";

function DataCenter({ searchQuery }) {
  const filteredData = data.filter(user =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="scroll-box-container">
      <ul>
        {filteredData.map((user, index) => (
          <li key={index}>
            <Link
              to={`/data/${index}`}
              state={{ user }}
              className="user-tile"       // new wrapper class
            >
              <div className="scroll-box-name">
                <h4>{user.firstName} {user.lastName}</h4>
              </div>
              <div className="pick-up-status">
                <h4>Last pick up:</h4>
                <h4>{user.lastPickUp}</h4>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataCenter;
