import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        axios.get('http://localhost:8080/Question/getAllQuestion')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions', error);
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

                                    {questions.map((q) => (
                                        <option key={q.id} value={q.questionText}>
                                            {q.questionText}
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
