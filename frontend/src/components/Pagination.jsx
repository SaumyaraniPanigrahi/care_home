function Pagination() {
  return (
    <div className="pagination-container">
      <button className="pagination-button">Previous</button>

      <button className="pagination-button active">1</button>

      <button className="pagination-button">2</button>

      <button className="pagination-button">3</button>

      <button className="pagination-button">4</button>

      <button className="pagination-button">Next</button>

      <span className="page-count">10 of 16</span>
    </div>
  );
}

export default Pagination;
