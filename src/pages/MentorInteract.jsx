import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MentorInteract.css';

const mentorData = {
  1: {
    name: 'Aarav Singh',
    heading: 'AI/ML Expert | Mentor at Google',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 4.8,
    social: {
      linkedin: 'https://linkedin.com/in/aaravsingh',
      youtube: 'https://youtube.com/aaravmentor',
    },
    skills: ['Python', 'TensorFlow', 'Deep Learning'],
    experience: 'Senior ML Engineer at Google for 5+ years.',
    profile: 'Building AI that powers billions of users.',
    education: ['B.Tech - IIT Delhi', 'M.S. AI - Stanford University'],
    availability: ['Mon-Fri: 6-8 PM', 'Sat-Sun: 2-5 PM'],
  },
  2: {
    name: 'Priya Sharma',
    heading: 'Frontend Developer | Educator',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4.6,
    social: {
      linkedin: 'https://linkedin.com/in/priyasharma',
      youtube: 'https://youtube.com/pryacodes',
    },
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    experience: '4+ years building intuitive UIs.',
    profile: 'Frontend dev & YouTuber with 100k+ subscribers.',
    education: ['BCA - Delhi University'],
    availability: ['Mon-Fri: 3-5 PM'],
  },
  3: {
    name: 'Rohit Mehta',
    heading: 'Blockchain Developer at Polygon',
    image: 'https://randomuser.me/api/portraits/men/64.jpg',
    rating: 3.8,
    social: {
      linkedin: 'https://linkedin.com/in/rohitmehta',
      youtube: 'https://youtube.com/rohitcodes',
    },
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    experience: '4+ years building intuitive UIs.',
    profile: 'Frontend dev & YouTuber with 100k+ subscribers.',
    education: ['BCA - Delhi University'],
    availability: ['Mon-Fri: 3-5 PM'],
  },
  4: {
    name: 'Anjali Verma',
    heading: 'Data Scientist at Amazon',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.7,
    social: {
      linkedin: 'https://linkedin.com/in/anjaliverma',
      youtube: 'https://youtube.com/anjalicodes',
    },
    skills: ['Data Science', 'Python', 'Machine Learning'],
    experience: '4+ years building intuitive UIs.',
    profile: 'Frontend dev & YouTuber with 100k+ subscribers.',
    education: ['BCA - Delhi University'],
    availability: ['Mon-Fri: 3-5 PM'],
  },
  5: {
    name: 'Sneha Kapoor',
    heading: 'UI/UX Designer at Swiggy',
    image: 'https://randomuser.me/api/portraits/women/38.jpg',
    rating: 4.7,
    social: {
      linkedin: 'https://linkedin.com/in/snehakapoor',
      youtube: 'https://youtube.com/snehakapoorcodes',
    },
    skills: ['Data Science', 'Python', 'Machine Learning'],
    experience: '4+ years building intuitive UIs.',
    profile: 'Frontend dev & YouTuber with 100k+ subscribers.',
    education: ['BCA - Delhi University'],
    availability: ['Mon-Fri: 3-5 PM'],
  },
};

function MentorInteract() {
  const { id } = useParams();
  const mentor = mentorData[id];
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Handle feedback submission
  const handleSubmitFeedback = () => {
    alert('Feedback submitted successfully!');
    setFeedbackSubmitted(true);
  };
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionMessage, setSessionMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Check if followed on mount
  useEffect(() => {
    const followedMentors = JSON.parse(localStorage.getItem('followedMentors') || '[]');
    setIsFollowed(followedMentors.includes(id));

    const savedFeedback = JSON.parse(localStorage.getItem(`feedback_${id}`));
    if (savedFeedback) {
      setRating(savedFeedback.rating);
      setComment(savedFeedback.comment);
      setFeedbackSubmitted(true);
    }
  }, [id]);

  useEffect(() => {
    const followedMentors = JSON.parse(localStorage.getItem('followedMentors') || '[]');
    setIsFollowed(followedMentors.includes(id));
  }, [id]);

  // Toggle follow
  const handleFollowToggle = () => {
    const followedMentors = JSON.parse(localStorage.getItem('followedMentors') || '[]');
    let updatedFollows;

    if (isFollowed) {
      updatedFollows = followedMentors.filter(mentorId => mentorId !== id);
      const updatedBookmarks = JSON.parse(localStorage.getItem('bookmarkedMentors') || '[]');
      const newBookmarks = updatedBookmarks.filter(mentor => mentor.id !== id);
      localStorage.setItem('bookmarkedMentors', JSON.stringify(newBookmarks));
    } else {
      updatedFollows = [...followedMentors, id];
      const mentorToBookmark = {
        id,
        name: mentor.name,
        heading: mentor.heading,
        image: mentor.image,
        rating: mentor.rating,
      };
      const updatedBookmarks = JSON.parse(localStorage.getItem('bookmarkedMentors') || '[]');
      updatedBookmarks.push(mentorToBookmark);
      localStorage.setItem('bookmarkedMentors', JSON.stringify(updatedBookmarks));
    }

    localStorage.setItem('followedMentors', JSON.stringify(updatedFollows));
    setIsFollowed(!isFollowed);
  };

  // Handle rating selection (CRUD)
  const handleRating = (rate) => {
    setRating(rate);
    const feedback = { rating: rate, comment };
    localStorage.setItem(`feedback_${id}`, JSON.stringify(feedback));
  };

  // Handle comment change (CRUD)
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    const feedback = { rating, comment: e.target.value };
    localStorage.setItem(`feedback_${id}`, JSON.stringify(feedback));
  };

  // Handle session date, time, and message change
  const handleSessionInput = (e) => {
    const { name, value } = e.target;
    if (name === 'date') {
      setSessionDate(value);
    } else if (name === 'time') {
      setSessionTime(value);
    } else if (name === 'message') {
      setSessionMessage(value);
    }
  };

  // Validate session form
  const validateSessionForm = () => {
    const errors = {};
    if (!sessionDate) errors.date = 'Date is required';
    if (!sessionTime) errors.time = 'Time is required';
    if (!sessionMessage) errors.message = 'Message cannot be empty';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle session request submission
  const handleSessionRequestSubmit = (e) => {
  e.preventDefault();
  if (validateSessionForm()) {
    const sessionRequest = {
      id, // Mentor ID
      date: sessionDate,
      time: sessionTime,
      message: sessionMessage,
    };

    // Retrieve existing requests or initialize an empty array
    const existingRequests = JSON.parse(localStorage.getItem('sessionRequests') || '[]');
    existingRequests.push(sessionRequest);
    localStorage.setItem('sessionRequests', JSON.stringify(existingRequests));

    setShowForm(false);  // Close the form after submission
    alert('Session Request Submitted!');
  }
};


  // Handle deleting feedback (CRUD)
  const handleDeleteFeedback = () => {
    localStorage.removeItem(`feedback_${id}`);
    setRating(0);
    setComment('');
    setFeedbackSubmitted(false);
  };

  if (!mentor) return <h2>Mentor not found</h2>;

  return (
    <div className="container py-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate('/discover')}>← Back to Discover</button>

      <div className="row">
        {/* Left side for Mentor Details */}
        <div className="col-md-6">
          <div className="text-center mb-4">
            <img src={mentor.image} className="rounded-circle profile-pic mb-2" alt={mentor.name} width={120} />
            <h2>{mentor.name}</h2>
            <p>{mentor.heading}</p>
            <p><strong>Rating:</strong> ⭐ {mentor.rating}</p>
            <p>
              <a href={mentor.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
              <a href={mentor.social.youtube} target="_blank" rel="noopener noreferrer"> YouTube</a>
            </p>
            <button className={`btn ${isFollowed ? 'btn-outline-secondary' : 'btn-outline-primary'} mt-2`} onClick={handleFollowToggle}>
              {isFollowed ? 'Following' : 'Follow'}
            </button>
          </div>

          <div className="mb-3"><strong>Skills:</strong> {mentor.skills.join(', ')}</div>
          <div className="mb-3"><strong>Experience:</strong> {mentor.experience}</div>
          <div className="mb-3"><strong>Current Profile:</strong> {mentor.profile}</div>
          <div className="mb-3">
            <strong>Education:</strong>
            <ul>{mentor.education.map((edu, i) => <li key={i}>{edu}</li>)}</ul>
          </div>
          <div className="mb-3">
            <strong>Availability:</strong>
            <ul>{mentor.availability.map((slot, i) => <li key={i}>{slot}</li>)}</ul>
          </div>
        </div>

        {/* Right side for Request Session Button and Feedback Form */}
        <div className="col-md-6">
          <div className="text-center mt-4">
            <button className="btn btn-success me-2" onClick={() => setShowForm(true)}>Request Session</button>
          </div>

          {showForm && (
            <div className="mt-4 p-4 border rounded">
              <h4>Session Request</h4>
              <form onSubmit={handleSessionRequestSubmit}>
                <div className="mb-2">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={sessionDate}
                    onChange={handleSessionInput}
                  />
                  {formErrors.date && <p className="text-danger">{formErrors.date}</p>}
                </div>
                <div className="mb-2">
                  <label>Time</label>
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    value={sessionTime}
                    onChange={handleSessionInput}
                  />
                  {formErrors.time && <p className="text-danger">{formErrors.time}</p>}
                </div>
                <div className="mb-2">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="3"
                    value={sessionMessage}
                    onChange={handleSessionInput}
                  />
                  {formErrors.message && <p className="text-danger">{formErrors.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-link" onClick={() => setShowForm(false)}>Cancel</button>
              </form>
            </div>
          )}

          {/* Star Rating */}
          <div className="mt-4">
            <h5>Rate this Mentor:</h5>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div className="mt-4">
            <h5>Leave a Comment:</h5>
            <textarea
              className="form-control"
              rows="3"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>

          {/* Submit Feedback */}
          {!feedbackSubmitted && (
            <div className="mt-4">
              <button className="btn btn-primary" onClick={handleSubmitFeedback}>
                Submit Feedback
              </button>
            </div>
          )}

          {/* Show Feedback after submission */}
          {feedbackSubmitted && (
            <div className="mt-4">
              <h5>Feedback Submitted:</h5>
              <p><strong>Rating:</strong> {rating} Stars</p>
              <p><strong>Comment:</strong> {comment}</p>
              <button className="btn btn-danger" onClick={handleDeleteFeedback}>
                Delete Feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MentorInteract;
