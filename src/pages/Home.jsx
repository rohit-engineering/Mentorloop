import React from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaBriefcase, FaLaptopCode, FaSearch, FaCalendarAlt, FaFolderOpen, FaChartLine } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/Home.css";

export default function Home() {
  return (
    <div className="container py-5 position-relative">
      {/* Top Right Auth Buttons */}
      <div className="position-absolute top-0 end-0 p-3">
        <Link to="/signup" className="btn btn-primary me-2">Sign Up</Link>
        <Link to="/login" className="btn btn-outline-primary">Login</Link>
      </div>

      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4 text-primary">Learn Together, Grow Together</h1>
        <p className="lead text-muted">
          A peer-to-peer learning and mentorship platform connecting mentors and learners to foster personal and professional growth.
        </p>
      </div>

      {/* Who It's For */}
      <section className="text-center mb-5">
        <h3 className="fw-bold mb-4">Who It's For</h3>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <FaUserGraduate size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">Learners</h5>
                <p className="text-muted">Gain knowledge and skills from experienced mentors</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <FaBriefcase size={40} className="text-success mb-3" />
                <h5 className="fw-bold">Professionals</h5>
                <p className="text-muted">Share your expertise and guide others in their careers</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <FaLaptopCode size={40} className="text-info mb-3" />
                <h5 className="fw-bold">Students</h5>
                <p className="text-muted">Enhance your education with real-world insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MentorLoop */}
      <section className="text-center mb-5">
        <h3 className="fw-bold mb-3">Why MentorLoop?</h3>
        <p className="lead text-muted">
          MentorLoop makes it easy to find the right mentor, schedule sessions, and track your progress asynchronously.
          Join a community dedicated to mutual growth.
        </p>
      </section>

      {/* Features */}
      <section className="text-center">
        <h3 className="fw-bold mb-4">Features</h3>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow feature-box border-0">
              <div className="card-body">
                <FaSearch size={35} className="text-primary mb-3" />
                <h6 className="fw-bold">Mentor Search</h6>
                <p className="text-muted">Find mentors by skills and experience</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow feature-box border-0">
              <div className="card-body">
                <FaCalendarAlt size={35} className="text-success mb-3" />
                <h6 className="fw-bold">Scheduling</h6>
                <p className="text-muted">Book sessions at your convenience</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow feature-box border-0">
              <div className="card-body">
                <FaFolderOpen size={35} className="text-info mb-3" />
                <h6 className="fw-bold">Resource Sharing</h6>
                <p className="text-muted">Access and share documents, links, and more</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow feature-box border-0">
              <div className="card-body">
                <FaChartLine size={35} className="text-warning mb-3" />
                <h6 className="fw-bold">Progress Tracking</h6>
                <p className="text-muted">Monitor your learning journey and milestones</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
