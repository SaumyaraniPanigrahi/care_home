function Header() {
  return (
    <header className="portal-header">
      <div className="care-logo">
        <span className="logo-symbol">Care</span>
        <span className="logo-text">CARE SERVICES</span>
      </div>

      <div className="portal-title">Care Services Prescription Portal</div>

      <div className="header-actions">
        <i className="bi bi-grid-3x3-gap-fill grid-icon"></i>

        <div className="profile-icon">
          <i className="bi bi-person-fill"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
