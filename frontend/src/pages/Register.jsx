import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


<<<<<<< HEAD

=======
>>>>>>> 7098f928de0009be0fb5d267fbd9835b285e9e10
function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    mobileno: "",
    address: "",
    answer: "",
    role: { roleid: 2 },
    question: { questionid: "" }
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/user/questions")
      .then(res => setQuestions(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/user/register", form);
      alert("Registered successfully");
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
            <h3 className="text-center mb-3">Register</h3>

            <form onSubmit={submit} className="row g-3">
              <div className="col-md-6">
                <input className="form-control" placeholder="Username"
                value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })} />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Password"
                value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Mobile"
                value={form.mobileno}
                  onChange={e => setForm({ ...form, mobileno: e.target.value })} />
              </div>

<<<<<<< HEAD
              {/* Category */}
=======
>>>>>>> 7098f928de0009be0fb5d267fbd9835b285e9e10
              <div className="col-md-6">
                <input className="form-control" placeholder="Address"
                value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>

              <div className="col-md-6">
                <select className="form-select"
                value={form.question.questionid}
                  onChange={e => setForm({ ...form, question: { questionid: e.target.value } })}>
                  <option>Select Question</option>
                  {questions.map(q => (
                    <option key={q.questionid} value={q.questionid}>
                      {q.question}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Answer"
                value={form.answer}
                  onChange={e => setForm({ ...form, answer: e.target.value })} />
              </div>

              <div className="col-12">
                <button className="btn btn-success w-100">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
