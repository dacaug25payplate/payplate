import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 FORM STATE
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });

  // 🔹 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    axios.post("http://localhost:8080/User/login", formData)
      .then(response => {
        alert("Login Successful");
        console.log(response.data);
        
        // example: save user data / token
       localStorage.setItem("user", JSON.stringify(response.data));
        if(response.data.roleId.roleName === "Admin")
           

        navigate("/dashboard"); // redirect after login
      })
      .catch(error => {
        console.error(error);
        alert("Invalid Username or Password");
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleSubmit}>

              {/* USERNAME */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="userName"
                  className="form-control"
                  placeholder="Enter username"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* SHOW PASSWORD */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label small">
                  Show Password
                </label>
              </div>

              {/* LOGIN BUTTON */}
              <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <button className="btn btn-success">Login</button>
                  </div>
                  <div className="col-md-4"></div>
              </div>
              {/* <button type="submit" className="btn btn-primary w-100">
                Login
              </button> */}

              {/* LINKS */}
              <div className="text-center mt-3">
                <Link to="/forgetpassword" className="d-block mb-2">
                  Forget Password?
                </Link>

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
