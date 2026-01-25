import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/user/login", data);
      //do this, but before check res is ok
      dispatch(setUser(res.data));

      if(res.data.role.roleid==1){
        navigate("/admin");
      }
      else if(res.data.role.roleid==2){
        //to user
        navigate("/user");
      }
      else if(res.data.role.roleid==3){
        //to waiter
        navigate("/waiter");
      }
      else if(res.data.role.roleid==4){
        //to cook
        navigate("/cook");
      } 
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
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
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


              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
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


              <button className="btn btn-success w-100">Login</button>
            </form>

            <div className="text-center mt-3">
              <Link to="/forgetpassword">Forgot Password?</Link><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;