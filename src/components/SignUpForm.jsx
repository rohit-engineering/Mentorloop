import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await axios.post("https://mentorloop.onrender.com/signup", formData);
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userRole", formData.role);
      navigate(formData.role === "mentor" ? "/MentorDashboard" : "/Dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h3 className="text-center mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="first_name" placeholder="First Name" onChange={handleChange} required />
                <label>First Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating">
                <input type="text" className="form-control" name="last_name" placeholder="Last Name" onChange={handleChange} required />
                <label>Last Name</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating">
                <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
                <label>Email</label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating">
                <input type="tel" className="form-control" name="phone" placeholder="Phone" onChange={handleChange} required />
                <label>Phone</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} required />
                <label>Password</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                <label>Confirm Password</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
                  <option value="learner">Learner</option>
                  <option value="mentor">Mentor</option>
                </select>
                <label>Role</label>
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100 py-2">
                Sign Up
              </button>
            </div>
          </div>
        </form>

        <p className="mt-3 text-center text-muted" style={{ fontSize: '0.9rem' }}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
