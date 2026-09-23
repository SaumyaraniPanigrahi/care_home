import { useState, useEffect } from "react";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import CareHomeTableAdmin from "../components/CareHomeTableAdmin";
import Pagination from "../components/Pagination";

import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/features/userSlice";
import { fetchCareHomes } from "../redux/features/careHomeSlice";
import SubHeader from "../components/SubHeader/SubHeader";

function PortalUserSearch() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("user");

  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const careHomes = useSelector((state) => state.careHome.careHomes);

  useEffect(() => {
    if (searchType === "user") {
      dispatch(fetchUser());
    }

    if (searchType === "careHome") {
      dispatch(fetchCareHomes());
    }
  }, [searchType, dispatch]);

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      user.firstName?.toLowerCase().includes(searchValue) ||
      user.lastName?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue)
    );
  });

  const filteredCareHomes = careHomes.filter((careHome) => {
    const searchValue = search.toLowerCase();

    return (
      careHome.name?.toLowerCase().includes(searchValue) ||
      careHome.address?.toLowerCase().includes(searchValue) ||
      careHome.region?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="portal-page">
      <Header />

      <SubHeader title="Portal User Search" />

      <main className="main-content">
        <div className="back-button">
          <i className="bi bi-chevron-left"></i>
        </div>

        <div className="search-card">
          <div className="search-toolbar">
            <div className="search-toggle">
              <span className={searchType === "user" ? "active-label" : ""}>
                User Search
              </span>

              <button
                type="button"
                className={`toggle-switch ${
                  searchType === "careHome" ? "care-home" : ""
                }`}
                onClick={() => {
                  setSearchType(searchType === "user" ? "careHome" : "user");
                  setSearch("");
                }}
                aria-label="Toggle search type"
              >
                <span className="toggle-circle"></span>
              </button>

              <span className={searchType === "careHome" ? "active-label" : ""}>
                Care Home Search
              </span>
            </div>

            <SearchBar
              search={search}
              setSearch={setSearch}
              searchType={searchType}
            />
          </div>

          {/* User Search */}
          {searchType === "user" && <UserTable users={filteredUsers} />}

          {/* Care Home Search */}
          {searchType === "careHome" && (
            <CareHomeTableAdmin careHomes={filteredCareHomes} />
          )}

          {/* <Pagination /> */}
        </div>
      </main>
    </div>
  );
}

export default PortalUserSearch;
