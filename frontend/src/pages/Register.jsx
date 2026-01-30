import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const initialForm = {
    username: "",
    password: "",
    confirmPassword: "",
    mobileno: "",
    address: "",
    answer: "",
    role: { roleid: 2 },
    question: { questionid: "" }
  };

  const [form, setForm] = useState(initialForm);
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const [usernameStatus, setUsernameStatus] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);

  const checkUsernameAvailability = async (username) => {
    if (!username.trim()) return;

    try {
      setCheckingUsername(true);
      const res = await axios.get(
        "http://localhost:8080/api/user/check-username",
        { params: { username } }
      );

      if (res.data === true) {
        setUsernameStatus("Username already exists");
      } else {
        setUsernameStatus("Username available");
      }
    } catch {
      setUsernameStatus("");
    } finally {
      setCheckingUsername(false);
    }
  };


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/questions")
      .then(res => setQuestions(res.data));
  }, []);

  /* 🔐 PASSWORD RULE STATUS (for green ticks) */
  const passwordRules = {
    length: form.password.length >= 6 && form.password.length <= 12,
    uppercase: /[A-Z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[@$!%*?&]/.test(form.password)
  };
  const isPasswordFullyValid = Object.values(passwordRules).every(Boolean);

  useEffect(() => {
    if (isPasswordFullyValid) {
      setShowPasswordRules(false);
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  }, [form.password]);



  /* 🧪 VALIDATION */
  const validate = () => {
    let newErrors = {};

    if (!form.username.trim())
      newErrors.username = "Username is required.";

    if (usernameStatus === "Username already exists") {
      newErrors.username = "Please choose a different username";
    }


    /* PASSWORD */
    if (!form.password) {
      newErrors.password = ["Password is required."];
      setShowPasswordRules(true);
    } else {
      const messages = [];

      if (!passwordRules.length)
        messages.push("• Must be 6–12 characters long");
      if (!passwordRules.uppercase)
        messages.push("• Must include one uppercase letter");
      if (!passwordRules.number)
        messages.push("• Must include one number");
      if (!passwordRules.special)
        messages.push("• Must include one special character");

      if (messages.length > 0) {
        newErrors.password = messages;
        setShowPasswordRules(true); // 👈 SHOW RULES ONLY AFTER FAILURE
      }
    }


    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required.";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!form.mobileno)
      newErrors.mobileno = "Mobile number is required.";
    else if (!/^\d{10}$/.test(form.mobileno))
      newErrors.mobileno = "Mobile number must be exactly 10 digits.";

    if (!form.address.trim())
      newErrors.address = "Address is required.";

    if (!form.question.questionid)
      newErrors.question = "Please select a security question.";

    if (!form.answer.trim())
      newErrors.answer = "Answer is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* 🚀 SUBMIT */
  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...form };
    delete payload.confirmPassword;

    try {
      await axios.post("http://localhost:8080/api/user/register", payload);
      alert("Registered successfully");
      setForm(initialForm);
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">

          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Register</h3>

            <form onSubmit={submit} className="row g-3">

              {/* Username */}
              <div className="col-md-6">
                <label className="form-label">Username</label>

                <input
                  className="form-control"
                  value={form.username}
                  onChange={e => {
                    setForm({ ...form, username: e.target.value });
                    setUsernameStatus("");
                  }}
                  onBlur={() => checkUsernameAvailability(form.username)}
                />

                {checkingUsername && (
                  <small className="text-muted">Checking availability…</small>
                )}

                {usernameStatus && (
                  <small
                    className={
                      usernameStatus.includes("available")
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {usernameStatus}
                  </small>
                )}
              </div>


              {/* Password */}
              <div className="col-md-6">
                <label className="form-label">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={form.password}
                  onChange={e => {
                    const value = e.target.value;
                    if (value.length <= 12) {
                      setForm({ ...form, password: value });
                    }
                  }}
                  onBlur={() => {
                    if (!isPasswordFullyValid && form.password) {
                      setShowPasswordRules(true);
                    }
                  }}
                />

                {/* Error messages (only after failure) */}
                {errors.password && (
                  <div className="text-danger small mt-1">
                    {errors.password.map((msg, i) => (
                      <div key={i}>{msg}</div>
                    ))}
                  </div>
                )}

                {/* Password rules (auto-hide when valid) */}
                {showPasswordRules && !isPasswordFullyValid && (
                  <div className="small mt-2">
                    <div className={passwordRules.length ? "text-success" : "text-muted"}>
                      {passwordRules.length ? "✔" : "•"} 6–12 characters
                    </div>
                    <div className={passwordRules.uppercase ? "text-success" : "text-muted"}>
                      {passwordRules.uppercase ? "✔" : "•"} One uppercase letter (A-Z)
                    </div>
                    <div className={passwordRules.number ? "text-success" : "text-muted"}>
                      {passwordRules.number ? "✔" : "•"} One number (0-9)
                    </div>
                    <div className={passwordRules.special ? "text-success" : "text-muted"}>
                      {passwordRules.special ? "✔" : "•"} One special character
                    </div>
                  </div>
                )}
              </div>


              {/* Show Password */}
              <div className="col-12">
                <div className="form-check small text-muted">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label className="form-check-label" htmlFor="showPassword">
                    Show password
                  </label>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={form.confirmPassword}
                  onChange={e =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
                {errors.confirmPassword && (
                  <small className="text-danger">{errors.confirmPassword}</small>
                )}
              </div>

              {/* Mobile */}
              <div className="col-md-6">
                <label className="form-label">Mobile Number</label>
                <input
                  className="form-control"
                  maxLength="10"
                  value={form.mobileno}
                  onChange={e => {
                    if (/^\d*$/.test(e.target.value))
                      setForm({ ...form, mobileno: e.target.value });
                  }}
                />
                {errors.mobileno && <small className="text-danger">{errors.mobileno}</small>}
              </div>

              {/* Address */}
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  className="form-control"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                />
                {errors.address && <small className="text-danger">{errors.address}</small>}
              </div>

              {/* Security Question */}
              <div className="col-md-6">
                <label className="form-label">Security Question</label>
                <select
                  className="form-select"
                  value={form.question.questionid}
                  onChange={e =>
                    setForm({ ...form, question: { questionid: e.target.value } })
                  }
                >
                  <option value="">Select Question</option>
                  {questions.map(q => (
                    <option key={q.questionid} value={q.questionid}>
                      {q.question}
                    </option>
                  ))}
                </select>
                {errors.question && <small className="text-danger">{errors.question}</small>}
              </div>

              {/* Answer */}
              <div className="col-md-6">
                <label className="form-label">Answer</label>
                <input
                  className="form-control"
                  value={form.answer}
                  onChange={e => setForm({ ...form, answer: e.target.value })}
                />
                {errors.answer && <small className="text-danger">{errors.answer}</small>}
              </div>

              {/* Submit */}
              <div className="col-12 mt-3">
                <button className="btn btn-success w-100">
                  Register
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
