import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
  const [errors, setErrors] = useState({});

  // ✅ Validate Single Field (Real-Time)
  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!value.trim()) return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        break;

      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(value)) return "Password must contain one uppercase letter";
        if (!/[0-9]/.test(value)) return "Password must contain one number";
        break;

      case "mobileno":
        if (!value) return "Mobile number is required";
        if (!/^[0-9]{10}$/.test(value)) return "Mobile number must be 10 digits";
        break;

      case "address":
        if (!value.trim()) return "Address is required";
        break;

      case "questionid":
        if (!value) return "Please select a security question";
        break;

      case "answer":
        if (!value.trim()) return "Answer is required";
        break;

      default:
        return "";
    }
    return "";
  };

  // ✅ Handle Input Change with Validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedForm;

    if (name === "questionid") {
      updatedForm = { ...form, question: { questionid: value } };
    } else {
      updatedForm = { ...form, [name]: value };
    }

    setForm(updatedForm);

    setErrors({
      ...errors,
      [name === "questionid" ? "question" : name]: validateField(name, value)
    });
  };

  // ✅ Load Questions
  useEffect(() => {
    axios.get("http://localhost:8080/api/questions")
      .then(res => setQuestions(res.data));
  }, []);

  // ✅ Final Submit Validation
  const submit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateField("username", form.username),
      password: validateField("password", form.password),
      mobileno: validateField("mobileno", form.mobileno),
      address: validateField("address", form.address),
      question: validateField("questionid", form.question.questionid),
      answer: validateField("answer", form.answer)
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(err => err)) return;
    try {
      await axios.post("http://localhost:8080/api/register", form);
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

              {/* Username */}
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="username"
                  value={form.username}
                  placeholder="Username"
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.username}</small>
              </div>

              {/* Password */}
              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={form.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.password}</small>
              </div>

              {/* Mobile */}
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="mobileno"
                  value={form.mobileno}
                  placeholder="Mobile"
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.mobileno}</small>
              </div>

              {/* Address */}
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="address"
                  value={form.address}
                  placeholder="Address"
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.address}</small>
              </div>

              {/* Question */}
              <div className="col-md-6">
                <select
                  className="form-select"
                  name="questionid"
                  value={form.question.questionid}
                  onChange={handleChange}
                >
                  <option value="">Select Question</option>
                  {questions.map(q => (
                    <option key={q.questionid} value={q.questionid}>
                      {q.question}
                    </option>
                  ))}
                </select>
                <small className="text-danger">{errors.question}</small>
              </div>

              {/* Answer */}
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="answer"
                  value={form.answer}
                  placeholder="Answer"
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.answer}</small>
              </div>

              <div className="col-12">
                <button className="btn btn-success w-100">
                  Register
                </button>
              </div>

            </form>

            <div className="text-center mt-3">
              <Link to="/">Back to Login</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
