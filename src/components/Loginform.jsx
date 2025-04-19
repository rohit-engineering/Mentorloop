import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Loginform() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/login", formData);
      localStorage.setItem("userEmail", res.data.email);
      localStorage.setItem("userRole", res.data.role);
      navigate(res.data.role === "mentor" ? "/MentorDashboard" : "/Dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Welcome Back 👋</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input 
              className="form-control" 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input 
              className="form-control" 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Loginform;
