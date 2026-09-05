import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import NotesSection from "../components/NotesSection";

function ResidentPrescription() {
  const { residentId } = useParams();
  const navigate = useNavigate();

  const [resident, setResident] = useState(null);
  const [medications, setMedications] = useState([]);
  const [search, setSearch] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        setLoading(true);
        setError("");

        // Resident details
        const residentResponse = await axios.get(
          `http://localhost:8000/api/residents/${residentId}`,
        );

        // Resident medications
        const medicationResponse = await axios.get(
          `http://localhost:8000/api/residents/${residentId}/medications`,
        );

        setResident(residentResponse.data.resident);

        setMedications(medicationResponse.data.medications || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load resident information",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResidentData();
  }, [residentId]);

  const filteredMedications = medications.filter((medication) =>
    medication.medicineName?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="portal-page">
        <Header />

        <div className="resident-loading">Loading resident information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portal-page">
        <Header />

        <div className="resident-error">{error}</div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="portal-page">
        <Header />

        <div className="resident-error">Resident not found</div>
      </div>
    );
  }

  const allergies = Array.isArray(resident.allergies)
    ? resident.allergies.join(", ")
    : resident.allergies || "None recorded";

  return (
    <div className="portal-page">
      <Header />

      {/* Page title */}
      <div className="page-title">Resident Prescription Information</div>

      <main className="main-content">
        {/* Back */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="resident-prescription-card">
          {/* =========================
              RESIDENT INFORMATION
          ========================== */}

          <div className="resident-information">
            <div className="resident-name-row">
              <div className="resident-name">
                {resident.firstName} {resident.lastName}
              </div>

              <button
                className="notes-button"
                onClick={() => setShowNotes(true)}
              >
                <i className="bi bi-chat-left-text"></i>
                View / Add Resident Notes
              </button>
            </div>

            <div className="resident-care-home">
              {resident.careHome?.name ||
                resident.careHomeName ||
                "Care Home not assigned"}
            </div>

            <div className="resident-details">
              <div>
                <strong>DOB:</strong>{" "}
                {resident.dateOfBirth
                  ? new Date(resident.dateOfBirth).toLocaleDateString("en-GB")
                  : "Not available"}
              </div>

              <div>
                <strong>Allergies:</strong> {allergies}
              </div>
            </div>
          </div>

          {/* =========================
              MEDICATION SUMMARY
          ========================== */}

          <div className="medication-summary">
            <div className="summary-item active-summary">
              <span className="summary-icon">✓</span>

              <div>
                <strong>
                  {medications.filter((med) => med.status === "ACTIVE").length}
                </strong>

                <span>Active</span>
              </div>
            </div>

            <div className="summary-item stopped-summary">
              <span className="summary-icon">!</span>

              <div>
                <strong>
                  {medications.filter((med) => med.status === "STOPPED").length}
                </strong>

                <span>Stopped</span>
              </div>
            </div>

            <div className="summary-item total-summary">
              <span className="summary-icon">#</span>

              <div>
                <strong>{medications.length}</strong>

                <span>Total Medicines</span>
              </div>
            </div>
          </div>

          {/* =========================
              MEDICATION TABLE
          ========================== */}

          <div className="medication-section">
            <div className="medication-header">
              <h3>Prescribed Items</h3>

              <div className="medication-search">
                <input
                  type="text"
                  placeholder="Search Prescribed Item..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <i className="bi bi-search"></i>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table medication-table">
                <thead>
                  <tr>
                    <th>Prescribed Item</th>

                    <th>Dosage</th>

                    <th>Timing</th>

                    <th>Frequency</th>

                    <th>Start Date</th>

                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMedications.length > 0 ? (
                    filteredMedications.map((medication) => (
                      <tr key={medication._id}>
                        <td>
                          <i className="bi bi-capsule medication-icon"></i>

                          <span>{medication.medicineName}</span>
                        </td>

                        <td>{medication.dosage || "-"}</td>

                        <td>{medication.timing || "-"}</td>

                        <td>{medication.frequency || "-"}</td>

                        <td>
                          {medication.startDate
                            ? new Date(medication.startDate).toLocaleDateString(
                                "en-GB",
                              )
                            : "-"}
                        </td>

                        <td>
                          <span
                            className={`medication-status ${
                              medication.status?.toLowerCase() || ""
                            }`}
                          >
                            {medication.status === "ACTIVE" ? (
                              <>
                                <i className="bi bi-check-circle-fill"></i>
                                Active
                              </>
                            ) : (
                              <>
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                Stopped
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-medications">
                        No medications found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {showNotes && (
            <NotesSection
              residentId={residentId}
              onClose={() => setShowNotes(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default ResidentPrescription;
