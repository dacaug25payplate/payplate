import { useState, useEffect } from "react";
import axios from "axios";

function StaffRegister() {

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

  useEffect(() => {
    axios.get("http://localhost:8080/api/user/staff")
      .then(res => setRoles(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/api/user/questions")
      .then(res => setQuestions(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/user/register", form);
      alert("Registered successfully");
      setForm(initialForm);
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-4">

      <h4 className="mb-3">Add New Staff</h4>

      <div className="card p-4 shadow-sm">

        <form onSubmit={submit} className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={form.role.roleid}
              onChange={e => setForm({ ...form, role: { roleid: e.target.value } })}
            >
              <option value="">Select Role</option>
              {roles.map(r => (
                <option key={r.roleid} value={r.roleid}>
                  {r.rolename}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile</label>
            <input
              className="form-control"
              value={form.mobileno}
              onChange={e => setForm({ ...form, mobileno: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Security Question</label>
            <select
              className="form-select"
              value={form.question.questionid}
              onChange={e => setForm({ ...form, question: { questionid: e.target.value } })}
            >
              <option value="">Select Question</option>
              {questions.map(q => (
                <option key={q.questionid} value={q.questionid}>
                  {q.question}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Answer</label>
            <input
              className="form-control"
              value={form.answer}
              onChange={e => setForm({ ...form, answer: e.target.value })}
            />
          </div>

          <div className="col-12 text-center mt-3">
            <button className="btn btn-success px-6">
              Register Staff
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default StaffRegister;
