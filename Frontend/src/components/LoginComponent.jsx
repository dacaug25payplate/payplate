import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <form>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter username"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label small" >
                  Show Password
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <br />
                <div className="text-center mt-3">
                    <Link to="/forgetpassword" className="d-block mb-2">Forget Password?</Link>
                

                <span className="me-1">Don't have an account?</span>
                <Link to="/register">Register here</Link>
                </div>

              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
