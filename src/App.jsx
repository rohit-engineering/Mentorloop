import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import MentorDashboard from './pages/MentorDashboard';
import MentorInteract from './pages/MentorInteract';
import Discover from './pages/Discover';
import MentorProfile from './pages/MentorProfile';
import LearnerProfile from './pages/LearnerProfile';
import Socialspace from './pages/Socialspace';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/MentorDashboard" element={<MentorDashboard />} />
      <Route path="/mentor/:id" element={<MentorInteract />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/MentorProfile" element={<MentorProfile />} />
      <Route path="/LearnerProfile" element={<LearnerProfile />} />
      <Route path="/Socialspace" element={<Socialspace />} />
    </Routes>
  );
}

export default App;
