import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        
        {/* Left side - Logo / Name */}
        <Link className="navbar-brand fw-bold" to="/">
          PayPlate
        </Link>

        {/* Right side */}
        <div className="ms-auto">
          <Link className="btn btn-outline-light me-2" to="/">
            Login
          </Link>
          <Link className="btn btn-success" to="/register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
