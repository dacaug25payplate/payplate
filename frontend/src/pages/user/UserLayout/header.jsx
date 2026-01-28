import { Link, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between">
      
      {/* LEFT SIDE */}
      <span className="navbar-brand fw-bold">
        🍽️ PayPlate
        {user && (
          <span className="ms-2 text-warning">
            | Hi, {user.name}
          </span>
        )}
      </span>

      {/* RIGHT SIDE */}
      <button onClick={logout} className="btn btn-sm btn-outline-light">
        Logout
      </button>
    </nav>
  );
}

export default Header;
