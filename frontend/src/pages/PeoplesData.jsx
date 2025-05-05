import { useState } from "react";
import SearchData from "../components/SearchData/SearchData";
import DataCenter from "../components/DataCenter/DataCenter";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import Add_Client_Button from "../components/Add_Client_Button/Add_Client_Button";

function PeoplesData() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="Peoples-Data-page">
      <SearchData searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DataCenter searchQuery={searchQuery} />
      <Add_Client_Button />
      <LogoutButton />
    </div>
  );
}

export default PeoplesData;
