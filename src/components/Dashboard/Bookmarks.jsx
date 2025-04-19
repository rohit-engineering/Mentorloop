import React, { useEffect, useState } from 'react';

const Bookmarks = () => {
  const [bookmarkedMentors, setBookmarkedMentors] = useState([]);

  useEffect(() => {
    const mentors = JSON.parse(localStorage.getItem('bookmarkedMentors') || '[]');
    setBookmarkedMentors(mentors);
  }, []);

  return (
    <div className="bookmarks">
      <h4>Followed Mentors</h4>
      {bookmarkedMentors.length === 0 ? (
        <p>No followed mentors.</p>
      ) : (
        <ul className="list-group">
          {bookmarkedMentors.map((mentor, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex align-items-center">
                <img src={mentor.image} alt={mentor.name} className="rounded-circle" width={50} />
                <div className="ms-3">
                  <strong>{mentor.name}</strong>
                  <p>{mentor.heading}</p>
                  <p>Rating: ⭐ {mentor.rating}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
