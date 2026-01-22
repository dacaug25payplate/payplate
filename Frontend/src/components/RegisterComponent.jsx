import React, { useState } from 'react';
import axios from 'axios';

function RegisterComponent() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobile: '',
    address: '',
    question: '',
    answer: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/register', formData)
      .then(response => {
        alert('Registration Successful');
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('Registration Failed');
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
                  name="username"
                  className="form-control"
                  value={formData.username}
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
                  name="mobile"
                  className="form-control"
                  value={formData.mobile}
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
                <label className="form-label">Questions</label>
                <select
                  name="question"
                  className="form-select"
                  value={formData.question}
                  onChange={handleChange}
                >
                  <option value="">-- Select Question --</option>
                  <option value="pet">What is your pet name?</option>
                  <option value="school">What is your first school?</option>
                  <option value="city">In which city were you born?</option>
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
