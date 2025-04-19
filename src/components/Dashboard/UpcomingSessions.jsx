import React, { useEffect, useState } from 'react';

const UpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem('sessionRequests') || '[]');
    setSessions(storedSessions);
  }, []);

  return (
    <div className="upcoming-sessions">
      <h4>Upcoming Sessions</h4>
      {sessions.length === 0 ? (
        <p>No upcoming sessions.</p>
      ) : (
        <ul className="list-group">
          {sessions.map((session, index) => (
            <li key={index} className="list-group-item">
              <strong>Mentor ID:</strong> {session.id} <br />
              <strong>Date:</strong> {session.date} <br />
              <strong>Time:</strong> {session.time} <br />
              <strong>Message:</strong> {session.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingSessions;
