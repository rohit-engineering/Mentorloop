import React, { useEffect, useState } from 'react';
import LearningPathManager from '../components/LearningPathManager';
import AvailabilityManager from '../components/AvailabilityManager';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUserFriends } from 'react-icons/fa';
import '../styles/mentorDashboard.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [sessionRequests, setSessionRequests] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('mentorAuth');
    navigate('/');
  };

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('sessionRequests') || '[]');
    setSessionRequests(requests);

    const sessions = JSON.parse(localStorage.getItem('learnerAcceptedRequests') || '[]');
    setUpcomingSessions(sessions);
  }, []);

  const handleAccept = (index) => {
    const updatedRequests = [...sessionRequests];
    const acceptedRequest = updatedRequests.splice(index, 1)[0];

    // Save accepted request to learner's dashboard
    const learnerRequests = JSON.parse(localStorage.getItem('learnerAcceptedRequests') || '[]');
    learnerRequests.push(acceptedRequest);
    localStorage.setItem('learnerAcceptedRequests', JSON.stringify(learnerRequests));

    // Update session requests in local storage
    localStorage.setItem('sessionRequests', JSON.stringify(updatedRequests));
    setSessionRequests(updatedRequests);
  };

  const handleReject = (index) => {
    const updatedRequests = [...sessionRequests];
    updatedRequests.splice(index, 1); // Remove the rejected request

    // Update session requests in local storage
    localStorage.setItem('sessionRequests', JSON.stringify(updatedRequests));
    setSessionRequests(updatedRequests);
  };

  return (
    <div className="container py-4">
      {/* Top bar with title and profile */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👨‍🏫 Mentor Dashboard</h2>
        <div className="d-flex align-items-center gap-3">
        <Link to="/Space" className="text-decoration-none text-dark">
            <FaUserFriends size={30} />
          </Link>
          <Link to="/MentorProfile" className="text-decoration-none text-dark">
            <FaUserCircle size={30} />
          </Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Grid layout for dashboard sections */}
      <div className="row">
        {/* LEFT SIDE */}
        <div className="col-md-6 mb-4">
          <LearningPathManager />
          <div className="mt-4">
            <AvailabilityManager />
          </div>
        </div>

        {/* RIGHT SIDE - Reserve space for learner interactions */}
        <div className="col-md-6">
          {/* Session Requests */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>📨 Session Requests</Card.Header>
            <Card.Body>
              {sessionRequests.length === 0 ? (
                <p className="text-muted">No incoming session requests.</p>
              ) : (
                sessionRequests.map((request, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>Mentor ID:</strong> {request.id}</p>
                    <p><strong>Date:</strong> {request.date}</p>
                    <p><strong>Time:</strong> {request.time}</p>
                    <p><strong>Message:</strong> {request.message}</p>
                    <Button variant="success" onClick={() => handleAccept(index)}>Accept</Button>
                    <Button variant="danger" onClick={() => handleReject(index)} className="ms-2">Reject</Button>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="mb-4 shadow-sm">
            <Card.Header>📅 Upcoming Sessions</Card.Header>
            <Card.Body>
              {upcomingSessions.length === 0 ? (
                <p className="text-muted">No upcoming sessions.</p>
              ) : (
                upcomingSessions.map((session, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>Mentor ID:</strong> {session.id}</p>
                    <p><strong>Mentor ID:</strong> {session.id}</p>
                    <p><strong>Date:</strong> {session.date}</p>
                    <p><strong>Time:</strong> {session.time}</p>
                    <p><strong>Message:</strong> {session.message}</p>
                  </div>
                ))
              )}
            </Card.Body>
          </Card>

          {/* Session History */}
          <Card className="shadow-sm">
            <Card.Header>📜 Session History</Card.Header>
            <Card.Body>
              <p className="text-muted">Completed sessions, feedback, and ratings will appear here.</p>
              {/* You can implement session history display logic here if needed */}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
