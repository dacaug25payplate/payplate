import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [data, setData] = useState({ username: "", password: "" });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/login",
        data
      );

      // store user in redux
      dispatch(setUser(res.data));

      const roleId = res.data.role.roleid;

      if (roleId === 1) navigate("/admin");
      else if (roleId === 2) navigate("/user");
      else if (roleId === 3) navigate("/waiter");
      else if (roleId === 4) navigate("/cook");

    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data === "User not found") {
          setUsernameError("User not found");
        } 
        else if (err.response.data === "Wrong password") {
          setPasswordError("Wrong password");
        }
      } else {
        setPasswordError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="card shadow p-4">

            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleLogin}>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  value={data.username}
                  onChange={(e) => {
                    setData({ ...data, username: e.target.value });
                    setUsernameError("");
                  }}
                  required
                />
                {usernameError && (
                  <small className="text-danger">{usernameError}</small>
                )}
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                    setPasswordError("");
                  }}
                  required
                />
                {passwordError && (
                  <small className="text-danger">{passwordError}</small>
                )}
              </div>

              {/* Show Password Checkbox */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label small" htmlFor="showPassword">
                  Show Password
                </label>
              </div>

              <button className="btn btn-success w-100">
                Login
              </button>
            </form>

            <div className="text-center mt-3">
              <Link to="/forgetpassword">Forgot Password?</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
