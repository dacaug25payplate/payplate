import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StaffRegister() {
  const navigate = useNavigate();

  const initialForm = {
    username: "",
    password: "",
    mobileno: "",
    address: "",
    answer: "",
    role: { roleid: "" },
    question: { questionid: "" }
  };

  const [form, setForm] = useState(initialForm);
  const [questions, setQuestions] = useState([]);
  const [roles, setRoles] = useState([]);

  const [errors, setErrors] = useState({});
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    axios.get("http://localhost:8080/api/user/staff")
      .then(res => setRoles(res.data));

    axios.get("http://localhost:8080/api/user/questions")
      .then(res => setQuestions(res.data));
  }, []);

  /* ================= PASSWORD RULES ================= */

  const passwordRules = {
    length: form.password.length >= 6 && form.password.length <= 12,
    uppercase: /[A-Z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[@$!%*?&]/.test(form.password)
  };

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.number &&
    passwordRules.special;

  /* ================= USERNAME CHECK ================= */

  const checkUsernameAvailability = async (username) => {
    if (!username.trim()) return;

    try {
      setCheckingUsername(true);
      const res = await axios.get(
        "http://localhost:8080/api/user/check-username",
        { params: { username } }
      );

      setUsernameStatus(res.data ? "exists" : "available");
    } catch {
      setUsernameStatus("");
    } finally {
      setCheckingUsername(false);
    }
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    let newErrors = {};

    if (!form.role.roleid)
      newErrors.role = "Role is required";

    if (!form.username.trim())
      newErrors.username = "Username is required";
    else if (usernameStatus === "exists")
      newErrors.username = "Username already exists";

    if (!form.password)
      newErrors.password = "Password is required";
    else if (!isPasswordValid)
      newErrors.password = "Password does not meet requirements";

    if (!form.mobileno)
      newErrors.mobileno = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobileno))
      newErrors.mobileno = "Mobile number must be 10 digits";

    if (!form.address.trim())
      newErrors.address = "Address is required";

    if (!form.question.questionid)
      newErrors.question = "Security question is required";

    if (!form.answer.trim())
      newErrors.answer = "Answer is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:8080/api/user/register", form);
      alert("Staff registered successfully");
      setForm(initialForm);
      setUsernameStatus("");
    } catch {
      alert("Registration failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Register Staff</h4>
        <button className="btn btn-primary" onClick={() => navigate("/admin/createStaff")}>
          Back
        </button>
      </div>

      <div className="card p-4 shadow-sm">
        <form onSubmit={submit} className="row g-3">

          {/* Role */}
          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={form.role.roleid}
              onChange={e => setForm({ ...form, role: { roleid: e.target.value } })}
            >
              <option value="">Select Role</option>
              {roles.map(r => (
                <option key={r.roleid} value={r.roleid}>{r.rolename}</option>
              ))}
            </select>
            {errors.role && <small className="text-danger">{errors.role}</small>}
          </div>

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

            {checkingUsername && <small className="text-muted">Checking...</small>}

            {usernameStatus === "available" &&
              <small className="text-success">✔ Username available</small>}

            {usernameStatus === "exists" &&
              <small className="text-danger">Username already exists</small>}

            {errors.username && <small className="text-danger">{errors.username}</small>}
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              maxLength={12}
              value={form.password}
              onChange={e => {
                setForm({ ...form, password: e.target.value });
                setPasswordTouched(true);
              }}
            />


            {passwordTouched && !isPasswordValid && (
              <div className="small mt-1">
                <div className={passwordRules.length ? "text-success" : "text-danger"}>
                  {passwordRules.length ? "✔" : "✖"} 6–12 characters
                </div>
                <div className={passwordRules.uppercase ? "text-success" : "text-danger"}>
                  {passwordRules.uppercase ? "✔" : "✖"} One uppercase letter (A-Z)
                </div>
                <div className={passwordRules.number ? "text-success" : "text-danger"}>
                  {passwordRules.number ? "✔" : "✖"} One number (0-9)
                </div>
                <div className={passwordRules.special ? "text-success" : "text-danger"}>
                  {passwordRules.special ? "✔" : "✖"} One special character
                </div>
              </div>
            )}

            {passwordTouched && isPasswordValid &&
              <small className="text-success">✔ Strong password</small>}
          </div>

          <div className="form-check mt-1">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              checked={showPassword}
              onChange={e => setShowPassword(e.target.checked)}
            />
            <label
              className="form-check-label"
              htmlFor="showPassword"
              style={{ fontSize: "0.85rem" }}
            >
              Show password
            </label>
          </div>


          {/* Mobile */}
          <div className="col-md-6">
            <label className="form-label">Mobile</label>
            <input
              className="form-control"
              maxLength={10}
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

          {/* Question */}
          <div className="col-md-6">
            <label className="form-label">Security Question</label>
            <select
              className="form-select"
              value={form.question.questionid}
              onChange={e => setForm({ ...form, question: { questionid: e.target.value } })}
            >
              <option value="">Select Question</option>
              {questions.map(q => (
                <option key={q.questionid} value={q.questionid}>{q.question}</option>
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
          <div className="col-12 text-center mt-3">
            <button className="btn btn-success px-5">
              Register Staff
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default StaffRegister;
