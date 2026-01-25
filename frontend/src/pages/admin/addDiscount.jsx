import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function AddDiscount() {
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
    axios.get("http://localhost:8080/api/questions")
      .then(res => setQuestions(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
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
            <h3 className="text-center mb-3">Add Menu</h3>

            <form onSubmit={submit} className="row g-3">
              <div className="col-md-6">
                <input className="form-control" placeholder="Menu Name"
                  onChange={e => setForm({ ...form, username: e.target.value })} />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Description"
                  onChange={e => setForm({ ...form, password: e.target.value })} />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Price"
                  onChange={e => setForm({ ...form, mobileno: e.target.value })} />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Category Name"
                  onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>


              <div className="col-md-6">
                <input className="form-control" placeholder="Sub-Category Name"
                  onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>

              <div className="col-md-6">
                {/* <label className="form-label">Upload Image</label> */}
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload image"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.files[0] })
                  }
                />
              </div>

              <div className="row mt-4">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <button className="btn btn-success w-100">Add Discount</button>
                </div>
                <div className="col-md-4"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDiscount; 