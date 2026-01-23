import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegisterComponent() {

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    mobileNo: '',
    address: '',
    roleId: '',
    questionId: '',
    answer: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/User/save', formData)
      .then(response => {
        alert('Registration Successful');
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('Registration Failed');
      });
  };

  const [questions, setQuestions] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/Question/getAllQuestion')
      .then(response => {
        setQuestions(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions', error);
      });

  }, []);

  useEffect(() => {

    axios.get('http://localhost:8080/Role/getAllRole')
      .then(response => {
        setRoles(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles', error);
      });

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container-md mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  name="userName"
                  className="form-control"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile No</label>
                <input
                  type="tel"
                  name="mobileNo"
                  className="form-control"
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  name="roleId"
                  className="form-select"
                  value={formData.roleId}
                  onChange={handleChange}
                >
                  <option value="">-- Select Role --</option>

                  {roles.map((r) => (
                    <option key={r.roleId} value={r.roleId}>
                      {r.roleName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Questions</label>
                <select
                  name="questionId"
                  className="form-select"
                  value={formData.questionId}
                  onChange={handleChange}
                >
                  <option value="">-- Select Question --</option>

                  {questions.map((q) => (
                    <option key={q.questionId} value={q.questionId}>
                      {q.questions}
                    </option>
                  ))}

                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Answer</label>
                <input
                  type="text"
                  name="answer"
                  className="form-control"
                  value={formData.answer}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 text-center mt-3">
                <button type="submit" className="btn btn-success">
                  Register
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterComponent;
