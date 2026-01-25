import { useState, useEffect } from "react";
import axios from "axios";

function StaffRegister(){
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
            .then(res => setRoles(res.data))
      },[]);

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
        // <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h3 className="text-center mb-3">Register</h3>
    
                <form onSubmit={submit} className="row g-3">

                  <div className="col-md-6">
                    <select className="form-select"
                    value={form.role.roleid}
                      onChange={e => setForm({ ...form, role: { roleid: e.target.value } })}>
                      <option>Select Role</option>
                      {roles.map(r => (
                        <option key={r.roleid} value={r.roleid}>
                          {r.rolename}
                        </option>
                      ))}
                    </select>
                  </div>
                  
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
            <div className="col-md-3"></div>

          </div>
        //</div>
      );
}

export default StaffRegister;