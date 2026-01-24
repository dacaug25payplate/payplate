import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ForgetPassword() {

    const navigate = useNavigate();


  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");

  const checkUsername = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/forgot/${username}`);
      setQuestion(res.data);
      setStep(2);
    } catch {
      alert("User not found");
    }
  };

  const verify = async () => {
    const res = await axios.post("http://localhost:8080/api/verify", { username, answer });
    res.data ? setStep(3) : alert("Wrong answer");
  };

  const update = async () => {
    await axios.post("http://localhost:8080/api/update", { username, password });
    alert("Password updated");
    setStep(1);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="card shadow p-4">
            <h4 className="text-center">Forgot Password</h4>

            {step === 1 && (
              <>
                <input className="form-control mb-3" placeholder="Username"
                  onChange={e => setUsername(e.target.value)} />
                <button className="btn btn-primary w-100" onClick={checkUsername}>Next</button>
              </>
            )}

            {step === 2 && (
              <>
                <p><b>{question}</b></p>
                <input className="form-control mb-3" placeholder="Answer"
                  onChange={e => setAnswer(e.target.value)} />
                <button className="btn btn-primary w-100" onClick={verify}>Verify</button>
              </>
            )}

            {step === 3 && (
              <>
                <input className="form-control mb-3" placeholder="New Password"
                  onChange={e => setPassword(e.target.value)} />
                <button className="btn btn-success w-100" onClick={update}>Update</button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
