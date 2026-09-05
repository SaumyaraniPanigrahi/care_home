import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ResidentTable from "../components/ResidentTable";

import { fetchCareHomeResidents } from "../redux/features/residentSlice";

function CareHomeResidents() {
  const { careHomeId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const residents = useSelector((state) => state.residents.residents);

  const loading = useSelector((state) => state.residents.loading);

  const error = useSelector((state) => state.residents.error);

  useEffect(() => {
    if (careHomeId) {
      dispatch(fetchCareHomeResidents(careHomeId));
    }
  }, [dispatch, careHomeId]);

  const filteredResidents = residents.filter((resident) => {
    const searchValue = search.toLowerCase();

    return (
      resident.firstName?.toLowerCase().includes(searchValue) ||
      resident.lastName?.toLowerCase().includes(searchValue) ||
      resident.email?.toLowerCase().includes(searchValue)
    );
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="portal-page">
      <Header />

      <div className="page-title">Care Home Residents</div>

      <main className="main-content">
        {/* Back Button */}
        <button type="button" className="back-button" onClick={handleBack}>
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="search-card">
          {/* Search */}
          <div className="search-toolbar">
            <SearchBar
              search={search}
              setSearch={setSearch}
              searchType="resident"
            />
          </div>

          {loading && (
            <div className="loading-message">Loading residents...</div>
          )}

          {error && <div className="error-message">{error}</div>}

          {!loading && !error && (
            <ResidentTable residents={filteredResidents} />
          )}
        </div>
      </main>
    </div>
  );
}

export default CareHomeResidents;
