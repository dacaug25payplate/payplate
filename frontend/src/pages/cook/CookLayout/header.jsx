import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toastr from "../../../Services/toastrService";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/logout",
        {},
        { withCredentials: true } // 🔑 send session cookie
      );

      toastr.success(res.data); // "Thank you, Waiter logged out successfully"

      // navigate to login after 5 seconds
      navigate("/login");
      // setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      console.error(err);
      toastr.error("Logout failed");
    }
  };


  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">
        🍽️ PayPlate Cook
      </span>

      {/* PROFILE ICON */}
      <div className="position-relative">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          width="35"
          height="35"
          className="rounded-circle"
          style={{ cursor: "pointer" }}
          onClick={() => setShowMenu(!showMenu)}
        />

        {/* SMALL MODAL / DROPDOWN */}
        {showMenu && (
          <div
            className="card position-absolute end-0 mt-2 shadow"
            style={{ width: "180px", zIndex: 1000 }}
          >
            <div className="card-body p-2">

              <button
                className="btn btn-sm btn-light w-100 mb-1 text-start"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/cook/userprofile");
                }}
              >
                👤 Profile
              </button>

              <button
                className="btn btn-sm btn-light w-100 mb-1 text-start"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/forgetpassword");
                }}
              >
                🔒 Change Password
              </button>

              <hr className="my-1" />

              <button
                className="btn btn-sm btn-outline-dark w-100"
                onClick={logout}
              >
                Logout
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;