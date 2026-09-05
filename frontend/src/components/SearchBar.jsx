function SearchBar({ search, setSearch, searchType }) {
  let placeholder = "";

  if (searchType === "user") {
    placeholder = "Search by Email Address, First Name or Last Name...";
  } else if (searchType === "careHome") {
    placeholder = "Search by Care Home Name...";
  } else if (searchType === "resident") {
    placeholder = "Search by First Name, Last Name or Email...";
  }

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="form-control search-input"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <i className="bi bi-search search-icon"></i>
    </div>
  );
}

export default SearchBar;
