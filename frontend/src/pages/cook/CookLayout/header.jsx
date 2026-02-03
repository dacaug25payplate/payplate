import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">🍽️ PayPlate Cook</span>

      <div>
        <Link to="/login" className="btn btn-sm btn-outline-light">
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Header;