import { useNavigate } from "react-router-dom";

function CareHomeTable({ careHomes = [] }) {
  const navigate = useNavigate();

  const handleRowClick = (careHome) => {
    const careHomeId = careHome._id || careHome.id;

    navigate(`/care-homes/${careHomeId}/residents`);
  };
  return (
    <div className="table-responsive">
      <table className="table care-home-table">
        <thead>
          <tr>
            <th>
              Care Home Name
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Address
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Region
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Phone
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Status
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>
          </tr>
        </thead>

        <tbody>
          {careHomes.length > 0 ? (
            careHomes.map((careHome, index) => (
              <tr
                key={careHome._id || careHome.id || index}
                onClick={() => handleRowClick(careHome)}
                className="care-home-row"
              >
                <td>{careHome.name}</td>

                <td>{careHome.address}</td>

                <td>{careHome.region}</td>

                <td>{careHome.phone}</td>

                <td>
                  <span className={`status ${careHome.status?.toLowerCase()}`}>
                    {careHome.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No care homes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CareHomeTable;
