import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const allMentors = [
  {
    id: 1, name: 'Aarav Singh', heading: 'AI/ML Expert at Google',
    image: 'https://randomuser.me/api/portraits/men/75.jpg', skills: ['AI', 'ML', 'Python'], rating: 4.5,
  },
  {
    id: 2, name: 'Priya Sharma', heading: 'Frontend Dev & Educator',
    image: 'https://randomuser.me/api/portraits/women/65.jpg', skills: ['React', 'JavaScript'], rating: 4.0,
  },
  {
    id: 3, name: 'Rohit Mehta', heading: 'Blockchain Developer at Polygon',
    image: 'https://randomuser.me/api/portraits/men/64.jpg', skills: ['Web3', 'Solidity'], rating: 3.8,
  },
  {
    id: 4, name: 'Anjali Verma', heading: 'Data Scientist at Amazon',
    image: 'https://randomuser.me/api/portraits/women/44.jpg', skills: ['Data Science', 'Python'], rating: 4.7,
  },
  {
    id: 5, name: 'Sneha Kapoor', heading: 'UI/UX Designer at Swiggy',
    image: 'https://randomuser.me/api/portraits/women/38.jpg', skills: ['UI/UX', 'Figma'], rating: 4.2,
  },
  {
    id: 6, name: 'Vikram Joshi', heading: 'Backend Dev at Netflix',
    image: 'https://randomuser.me/api/portraits/men/33.jpg', skills: ['Node.js', 'MongoDB'], rating: 3.9,
  },
  {
    id: 7, name: 'Riya Menon', heading: 'Cloud Engineer at AWS',
    image: 'https://randomuser.me/api/portraits/women/19.jpg', skills: ['AWS', 'Serverless'], rating: 4.6,
  },
  {
    id: 8, name: 'Arjun Nair', heading: 'Cybersecurity Analyst at IBM',
    image: 'https://randomuser.me/api/portraits/men/22.jpg', skills: ['Security', 'Hacking'], rating: 4.1,
  },
  {
    id: 9, name: 'Rohit kumar', heading: 'fullStack developer at TCS',
    image: 'https://randomuser.me/api/portraits/men/12.jpg', skills: ['MERN', 'Backend'], rating: 4.1,
  },
  {
    id: 10, name: 'sneha rajput', heading: 'System developer at TCS',
    image: 'https://randomuser.me/api/portraits/women/20.jpg', skills: ['C++', 'Shell'], rating: 4.1,
  },
];

const Discover = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchSkill, setSearchSkill] = useState('');
  const [minRating, setMinRating] = useState('');

  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavs);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (mentor) => {
    const isFav = favorites.some(f => f.id === mentor.id);
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== mentor.id));
    } else {
      setFavorites([...favorites, mentor]);
    }
  };

  const filterMentors = (mentors) => {
    return mentors.filter((mentor) => {
      const matchesSkill = searchSkill === '' || mentor.skills.join(' ').toLowerCase().includes(searchSkill.toLowerCase());
      const matchesRating = minRating === '' || mentor.rating >= parseFloat(minRating);
      return matchesSkill && matchesRating;
    });
  };

  const mentorsToShow = filterMentors(showFavoritesOnly ? favorites : allMentors);

  return (
    <div>
      {/* 🧭 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold"><a className="nav-link" href="/Dashboard">Dashboard</a></span>
        <span className="navbar-brand fw-bold"><a className="nav-link" href="/space">Space</a></span>
        <div className="ms-auto">
          <button
            className={`btn ${showFavoritesOnly ? 'btn-outline-light' : 'btn-light'} me-2`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            {showFavoritesOnly ? '🔁 All Mentors' : '❤️ Favorites'}
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="mb-3">🚀 Discover Mentors</h2>

        {/* 🔍 Filters */}
        <div className="row mb-4">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by skill (e.g., React)"
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            >
              <option value="">Filter by min rating</option>
              <option value="4.5">⭐ 4.5+</option>
              <option value="4.0">⭐ 4.0+</option>
              <option value="3.5">⭐ 3.5+</option>
            </select>
          </div>
        </div>

        {/* 🧑‍🏫 Mentor Cards */}
        <div className="row">
          {mentorsToShow.length === 0 ? (
            <p className="text-muted text-center">No mentors found.</p>
          ) : (
            mentorsToShow.map((mentor) => (
              <div className="col-md-3 mb-4" key={mentor.id}>
                <div className="card h-100 text-center shadow-sm">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="rounded-circle mx-auto mt-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{mentor.name}</h5>
                    <p className="card-text">{mentor.heading}</p>
                    <div className="mb-2">
                      {mentor.skills.map((skill, idx) => (
                        <span key={idx} className="badge bg-light text-dark me-1">{skill}</span>
                      ))}
                    </div>
                    <p className="text-warning">⭐ {mentor.rating}</p>
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => navigate(`/mentor/${mentor.id}`)}
                    >
                      View Profile
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() => toggleFavorite(mentor)}
                      title="Add to Favorites"
                    >
                      {favorites.find(f => f.id === mentor.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
