import { useNavigate } from "react-router-dom";
function ResidentTable({ residents = [] }) {
  const navigate = useNavigate();
  const handleResidentClick = (residentId) => {
    navigate(`/residents/${residentId}/prescription`);
  };

  return (
    <div className="table-responsive">
      <table className="table resident-table">
        <thead>
          <tr>
            <th>
              First Name
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Last Name
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Date of Birth
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Gender
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Care Home
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Status
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>
          </tr>
        </thead>

        <tbody>
          {residents.length > 0 ? (
            residents.map((resident, index) => (
              <tr
                key={resident._id || resident.id || index}
                onClick={() => handleResidentClick(resident._id)}
              >
                <td>{resident.firstName || "-"}</td>

                <td>{resident.lastName || "-"}</td>

                <td>{resident.dateOfBirth || "-"}</td>

                <td>{resident.gender || "-"}</td>

                <td>{resident.careHome?.name || resident.careHome || "-"}</td>

                <td>
                  <span className={`status ${resident.status?.toLowerCase()}`}>
                    {resident.status || "-"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No residents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ResidentTable;
