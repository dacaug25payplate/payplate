import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FORM DATA
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  // VALIDATION STATES
  const [errors, setErrors] = useState({});
  const [userExists, setUserExists] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);

  // 🔹 USERNAME CHANGE + SERVER VALIDATION
  const handleUsernameChange = async (e) => {
    const username = e.target.value;
    setData({ ...data, username });

    // Client-side validation
    if (!username.trim()) {
      setErrors({ username: "Username is required" });
      setUserExists(false);
      return;
    }


    // Server-side validation
    try {
      setCheckingUser(true);
      const res = await axios.get(
        `http://localhost:8080/api/Users/${username}`
      );

      if (res.data === true) {
        setErrors({});
        setUserExists(true);
      } else {
        setErrors({ username: "User not found" });
        setUserExists(false);
      }
    } catch (error) {
      setErrors({ username: "Server error" });
      setUserExists(false);
    } finally {
      setCheckingUser(false);
    }
  };

  // 🔹 PASSWORD VALIDATION
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setData({ ...data, password });

    if (!password.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required"
      }));
    } else if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters"
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: null }));
    }
  };

  // 🔹 LOGIN SUBMIT
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userExists || errors.password) return;

    try {
      const res = await axios.post(
        "http://localhost:8080/api/login",
        data
      );

      dispatch(setUser(res.data));
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid password");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleLogin}>
              {/* USERNAME */}
              <div className="mb-3">
                <label className="form-label">Username</label>

                <input
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  value={data.username}
                  onChange={handleUsernameChange}
                />

                {checkingUser && (
                  <small className="text-info">
                    Checking username...
                  </small>
                )}

                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username}
                  </div>
                )}

                {userExists && !errors.username && (
                  <small className="text-success">
                    User exists
                  </small>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  value={data.password}
                  onChange={handlePasswordChange}
                />

                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* LOGIN BUTTON */}
              <button
                className="btn btn-success w-100"
                disabled={!userExists || errors.password}
              >
                Login
              </button>
            </form>

            <div className="text-center mt-3">
              <Link to="/forgetpassword">Forgot Password?</Link>
              <br />
              <Link to="/register">Register here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
