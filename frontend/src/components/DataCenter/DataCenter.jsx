import "./DataCenter.css";

function DataCenter({ searchQuery }) {
  const data = [
    { firstName: "Ronnie", lastName: "Perez", lastPickUp: "4/20/24" },
    { firstName: "Carmen", lastName: "Coldiron", lastPickUp: "2/12/24" },
    { firstName: "Eric", lastName: "Dodd", lastPickUp: "4/01/24" },
    { firstName: "Amelia", lastName: "Snow", lastPickUp: "10/20/24" },
    { firstName: "Ethan", lastName: "Gleason", lastPickUp: "12/20/24" },
    { firstName: "Cliff", lastName: "Coldiron", lastPickUp: "6/20/24" },
    { firstName: "Billy", lastName: "Bob", lastPickUp: "7/22/24" },
    { firstName: "Meredith", lastName: "Gleason", lastPickUp: "5/07/23" }
  ];

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
            <h4>{user.firstName} {user.lastName}</h4>
            <div className="pick-up-status">
              <h4>Last pick up:</h4>
              <h4>{user.lastPickUp}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataCenter;
