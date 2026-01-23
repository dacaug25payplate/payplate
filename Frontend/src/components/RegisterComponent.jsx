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

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";

    // USERNAME
    if (name === "userName") {
      if (!value.trim()) {
        errorMsg = "Username is required";
      } else if (value.trim().length <= 3) {
        errorMsg = "Username must be more than 3 characters";
      } else {
        errorMsg = "Valid username .";
      }
    }

    // PASSWORD
    if (name === "password") {
      if (!value) {
        errorMsg = "Password is required";
      } else if (value.length < 5) {
        errorMsg = "Password must be at least 5 characters";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errorMsg = "Password must contain 1 special character";
      } else {
        errorMsg = "Strong password .";
      }
    }

    // MOBILE NUMBER (10 digits number)
    if (name === "mobileNo") {
      if (!value) {
        errorMsg = "Mobile number is required";
      } else if (!/^\d+$/.test(value)) {
        errorMsg = "Only digits allowed";
      } else if (value.length < 10) {
        errorMsg = "Mobile number must be 10 digits";
      } else if (value.length > 10) {
        errorMsg = "Only 10 digits allowed";
      } else {
        errorMsg = "Valid mobile number .";
      }
    }

    // ADDRESS
    if (name === "address") {
      if (!value.trim()) {
        errorMsg = "Address is required";
      } else if (value.length > 50) {
        errorMsg = "Address must be less than 50 characters";
      } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) {
        errorMsg = "Address must contain letters and numbers";
      } else {
        errorMsg = "Valid address .";
      }
    }

    // ANSWER (ONE WORD ONLY)
    if (name === "answer") {
      if (!value.trim()) {
        errorMsg = "Answer is required";
      } else if (/\s/.test(value)) {
        errorMsg = "Answer must be one word only";
      } else {
        errorMsg = "Valid answer .";
      }
    }

    return errorMsg;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // USERNAME
    if (!formData.userName.trim() || formData.userName.trim().length <= 3) {
      newErrors.userName = "Username must be more than 3 characters";
    }

    // PASSWORD
    if (
      !formData.password ||
      formData.password.length < 5 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be 5 characters and contain 1 special character";
    }

    // MOBILE
    if (!/^[0-9]{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Mobile number must be 10 digits";
    }

    // ADDRESS
    if (
      !formData.address.trim() ||
      formData.address.length > 50 ||
      !/(?=.*[A-Za-z])(?=.*\d)/.test(formData.address)
    ) {
      newErrors.address =
        "Address must contain letters, numbers and be under 50 characters";
    }

    // ANSWER
    if (!formData.answer.trim() || /\s/.test(formData.answer)) {
      newErrors.answer = "Answer must be one word only";
    }

    // Role 
    if (!formData.roleId) {
      newErrors.roleId = "Role is required";
    }

    // Question
    if (!formData.questionId) {
      newErrors.questionId = "Security question is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const payload = {
      userName: formData.userName,
      password: formData.password,
      mobileNo: formData.mobileNo,
      address: formData.address,
      answer: formData.answer,

      roleId: {
        roleId: Number(formData.roleId)
      },

      questionId: {
        questionId: Number(formData.questionId)
      }
    };

    console.log(payload);

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
    const { name, value } = e.target;

    // update form data
    setFormData({
      ...formData,
      [name]: value
    });

    // live validation
    const errorMessage = validateField(name, value);

    setErrors({
      ...errors,
      [name]: errorMessage
    });
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow p-5">

            <h3 className="text-center mb-4">Register</h3>

            <form onSubmit={handleSubmit}>
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
                  <small
                    className={
                      errors.userName?.includes(".")
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {errors.userName}
                  </small>
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
                  <small
                    className={
                      errors.password?.includes(".")
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {errors.password}
                  </small>
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
                  <small
                    className={
                      errors.mobileNo?.includes(".")
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {errors.mobileNo}
                  </small>
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
                  <small
                    className={
                      errors.address?.includes(".")
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {errors.address}
                  </small>
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
                  <small className="text-danger">{errors.roleId}</small>
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
                  <small className="text-danger">{errors.questionId}</small>
                </div>

                <div className="col-md-12">
                  <label className="form-label">Answer</label>
                  <input
                    type="text"
                    name="answer"
                    className="form-control"
                    value={formData.answer}
                    onChange={handleChange}
                  />
                  <small
                    className={
                      errors.answer?.includes(".")
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {errors.answer}
                  </small>
                </div>

                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-success w-100">
                    Register
                  </button>
                </div>

>>>>>>> d9e786654b0dcaf9538b676f6c5d3c02c1dabece
              </div>
            </form>

<<<<<<< HEAD
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
=======
>>>>>>> d9e786654b0dcaf9538b676f6c5d3c02c1dabece
          </div>
        </div>
      </div>
    </div>
  );

}

export default RegisterComponent;