import React from 'react';
import '../styles/Dashboard.css';
import UpcomingSessions from '../components/Dashboard/UpcomingSessions';
import ProgressTracker from '../components/Dashboard/ProgressTracker';
import SessionHistory from '../components/Dashboard/SessionHistory';
import MessageBox from '../components/Dashboard/MessageBox';
import Bookmarks from '../components/Dashboard/Bookmarks';

export default function Dashboard() {
  return (
    <div className="container py-4 learner-dashboard">
      <nav className="navbar navbar-expand-lg">
        <span className="navbar-brand fw-bold"><a className="nav-link" href="/Discover">Discover Mentors</a></span>
        <span className="navbar-brand fw-bold"><a className="nav-link" href="/space">Space</a></span>
        <button className="btn btn-outline-danger btn-sm" onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}>
          Logout
        </button>
        <span className="me-3 d-flex align-items-right">{localStorage.getItem('userEmail')}</span>
      </nav>
      <h2 className="text-center mb-4">Learner Dashboard</h2>
       <div className="row mb-4">
        <div className="col-md-8">
          <UpcomingSessions />
        </div>
        <div className="col-md-4">
          <ProgressTracker />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <SessionHistory />
        </div>
        <div className="col-md-4">
          <MessageBox />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Bookmarks />
        </div>
      </div>
    </div>
  );
}
