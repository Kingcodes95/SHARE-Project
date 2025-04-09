import { useState } from "react";
import SearchData from "../components/SearchData/SearchData";
import DataCenter from "../components/DataCenter/DataCenter";

function PeoplesData() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="Peoples-Data-page">
      <SearchData searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DataCenter searchQuery={searchQuery} />
    </div>
  );
}

export default PeoplesData;
