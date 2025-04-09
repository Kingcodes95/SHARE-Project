import "./SearchData.css";

function SearchData({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-div">
      <input
        type="text"
        placeholder="Enter Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button>Search</button>
    </div>
  );
}

export default SearchData;
