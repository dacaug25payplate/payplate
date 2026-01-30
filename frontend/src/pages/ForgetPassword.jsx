import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= PASSWORD RULES ================= */

  const passwordRules = {
    length: password.length >= 6 && password.length <= 12,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password)
  };

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.number &&
    passwordRules.special;

  /* ================= STEP 1 ================= */

  const checkUsername = async () => {
    setErrors({});
    if (!username.trim()) {
      setErrors({ username: "Username is required" });
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/forgot/${username}`
      );
      setQuestion(res.data);
      setStep(2);
    } catch {
      setErrors({ username: "User not found" });
    }
  };

  /* ================= STEP 2 ================= */

  const verify = async () => {
    if (!answer.trim()) {
      setErrors({ answer: "Answer is required" });
      return;
    }

    const res = await axios.post(
      "http://localhost:8080/api/user/verify",
      { username, answer }
    );

    res.data ? setStep(3) : setErrors({ answer: "Wrong answer" });
  };

  /* ================= STEP 3 ================= */

  const update = async () => {
    let newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!isPasswordValid) {
      newErrors.password = "Password does not meet requirements";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    await axios.post("http://localhost:8080/api/user/update", {
      username,
      password
    });

    alert("Password updated successfully");
    navigate("/");
  };

  /* ================= UI ================= */

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-4">
          <div className="card shadow p-4">

            <h4 className="text-center mb-3">Forgot Password</h4>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <label className="form-label">Username</label>
                <input
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                    setErrors({});
                  }}
                />
                {errors.username && (
                  <div className="invalid-feedback d-block">
                    {errors.username}
                  </div>
                )}

                <button className="btn btn-primary w-100 mt-3" onClick={checkUsername}>
                  Next
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <p className="fw-bold">{question}</p>

                <label className="form-label">Answer</label>
                <input
                  className={`form-control ${errors.answer ? "is-invalid" : ""}`}
                  value={answer}
                  onChange={e => {
                    setAnswer(e.target.value);
                    setErrors({});
                  }}
                />
                {errors.answer && (
                  <div className="invalid-feedback d-block">
                    {errors.answer}
                  </div>
                )}

                <button className="btn btn-primary w-100 mt-3" onClick={verify}>
                  Verify
                </button>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <label className="form-label">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  maxLength={12}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setPasswordTouched(true);
                  }}
                />

                {/* Password Rules */}
                {passwordTouched && !isPasswordValid && (
                  <div className="small mt-2">
                    <div className={passwordRules.length ? "text-success" : "text-danger"}>
                      {passwordRules.length ? "✔" : "✖"} 6–12 characters
                    </div>
                    <div className={passwordRules.uppercase ? "text-success" : "text-danger"}>
                      {passwordRules.uppercase ? "✔" : "✖"} One uppercase letter
                    </div>
                    <div className={passwordRules.number ? "text-success" : "text-danger"}>
                      {passwordRules.number ? "✔" : "✖"} One number
                    </div>
                    <div className={passwordRules.special ? "text-success" : "text-danger"}>
                      {passwordRules.special ? "✔" : "✖"} One special character
                    </div>
                  </div>
                )}

                <label className="form-label mt-3">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  maxLength={12}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />

                {errors.confirmPassword && (
                  <small className="text-danger">{errors.confirmPassword}</small>
                )}

                {/* Show password */}
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={showPassword}
                    onChange={e => setShowPassword(e.target.checked)}
                  />
                  <label className="form-check-label small">
                    Show password
                  </label>
                </div>

                {errors.password && (
                  <small className="text-danger d-block mt-1">
                    {errors.password}
                  </small>
                )}

                <button className="btn btn-success w-100 mt-3" onClick={update}>
                  Update Password
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
