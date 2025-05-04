import { useState } from "react";
import SearchData from "../components/SearchData/SearchData";
import DataCenter from "../components/DataCenter/DataCenter";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import NewClientButton from "../components/NewClientButton/NewClientButton";

function PeoplesData() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="Peoples-Data-page">
      <SearchData searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DataCenter searchQuery={searchQuery} />
      <NewClientButton />
      <LogoutButton />
    </div>
  );
}

export default PeoplesData;
