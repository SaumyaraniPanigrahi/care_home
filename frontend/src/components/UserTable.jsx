function UserTable({ users = [] }) {
  return (
    <div className="table-responsive">
      <table className="table user-table">
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
              Default Care Home
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>

            <th>
              Email Address
              <i className="bi bi-arrow-down-up sort-icon"></i>
            </th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id || user.id || index}>
                <td>{user.firstName}</td>

                <td>{user.lastName}</td>

                <td>{user.careHome?.name || user.careHome || "-"}</td>

                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
