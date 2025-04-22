import { useState } from "react";
import SearchData from "../components/SearchData/SearchData";
import DataCenter from "../components/DataCenter/DataCenter";
import LogoutButton from "../components/LogoutButton/LogoutButton";

function PeoplesData() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="Peoples-Data-page">
      <SearchData searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DataCenter searchQuery={searchQuery} />
      <LogoutButton />
    </div>
  );
}

export default PeoplesData;
