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

  const [errors, setErrors] = useState({});

  const checkUsername = async () => {
    setErrors({});
    if (username == "") {
      setErrors({ username: "Username is required" });
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/user/forgot/${username}`);
      if (res.data) {
        setQuestion(res.data); // security question from API
        setStep(2);
      } else {
        setErrors({ username: "User not found" });
      }
    } catch (error) {
      // setErrors({ username: "User not found" });
      alert("User not found");
    }
  };

  const verify = async () => {
    const res = await axios.post("http://localhost:8080/api/user/verify", { username, answer });
    res.data ? setStep(3) : alert("Wrong answer");
  };

  const update = async () => {
    await axios.post("http://localhost:8080/api/user/update", { username, password });
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
              <div>
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={`form-control mb-2 ${errors.username ? "is-invalid" : ""}`}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors({}); // clear error on typing
                  }}
                />
                {errors.username && (
                  <div className="invalid-feedback d-block">
                    {errors.username}
                  </div>
                )}

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={checkUsername}
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <p><b>{question}</b></p>

                <label htmlFor="answer" className="form-label">Answer</label>
                <input
                  id="answer"
                  type="text"
                  className={`form-control mb-2 ${errors.answer ? "is-invalid" : ""}`}
                  placeholder="Enter your answer"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setErrors({ ...errors, answer: null }); // clear answer error on typing
                  }}
                />
                {errors.answer && (
                  <div className="invalid-feedback d-block">
                    {errors.answer}
                  </div>
                )}

                <button
                  className="btn btn-primary w-100 mt-2"
                  onClick={() => {
                    // Reset previous errors
                    setErrors({ ...errors, answer: null });

                    // Validation: answer required
                    if (!answer.trim()) {
                      setErrors({ ...errors, answer: "Answer is required" });
                      return;
                    }

                    // Call verify function if valid
                    verify();
                  }}
                >
                  Verify
                </button>
              </div>
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
