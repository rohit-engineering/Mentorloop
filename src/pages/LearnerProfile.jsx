import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Dummy user database
const usersDB = [
  {
    id: "1",
    name: "Rohit Srivastava",
    college: "PTU Mohali Campus",
    university: "Punjab Technical University",
    course: "BTech",
    branch: "CSE",
    year: "2nd Year",
    batch: "2023-2027",
    interests: "Coding, Web Dev, SaaS, AI",
    futurePlans: "FAANG Job, Build SaaS Company",
    city: "New Delhi",
    area: "Laxmi Nagar",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "learner@example.com",
    username: "rohit_dev",
    role: "Learner"
  },
  {
    id: "2",
    name: "Ankit Sharma",
    college: "Codegnan Institute",
    university: "NA",
    course: "MCA",
    branch: "Full Stack",
    year: "Completed",
    batch: "2015-2018",
    interests: "Mentoring, Coding, Open Source",
    futurePlans: "Build EdTech Tools",
    city: "Hyderabad",
    area: "Madhapur",
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "mentor@example.com",
    username: "ankit_mentor",
    role: "Mentor"
  }
];

const loggedInUser = usersDB[0]; // Simulated login
const messageStorageKey = "messages";

const LearnerProfile = () => {
  const { userId } = useParams();
  const viewedUser = usersDB.find((u) => u.id === userId) || loggedInUser;
  const isOwnProfile = viewedUser.id === loggedInUser.id;

  const [isEditMode, setIsEditMode] = useState(false);
  const [isMessaging, setIsMessaging] = useState(false);
  const [profile, setProfile] = useState(viewedUser);
  const [formData, setFormData] = useState(viewedUser);
  const [messageForm, setMessageForm] = useState({
    to: profile.id,
    from: loggedInUser.id,
    subject: "",
    body: "",
  });
  const [messages, setMessages] = useState([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem(messageStorageKey)) || [];
    const userMessages = savedMessages.filter((msg) => msg.to === loggedInUser.id);
    setMessages(userMessages);
    setProfile(viewedUser);
    setFormData(viewedUser);
  }, [userId, viewedUser]);

  const handleSave = () => {
    setProfile(formData);
    setIsEditMode(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    const newMessage = {
      ...messageForm,
      to: profile.id,
      from: loggedInUser.id,
      timestamp: new Date().toLocaleString(),
      read: false,
    };
    const allMessages = JSON.parse(localStorage.getItem(messageStorageKey)) || [];
    const updatedMessages = [...allMessages, newMessage];
    localStorage.setItem(messageStorageKey, JSON.stringify(updatedMessages));
    alert("Message Sent Successfully!");
    setIsMessaging(false);
    setMessageForm({ to: profile.id, from: loggedInUser.id, subject: "", body: "" });
  };

  const handleInboxToggle = () => {
    // Mark all messages as read
    const allMessages = JSON.parse(localStorage.getItem(messageStorageKey)) || [];
    const updatedAllMessages = allMessages.map((msg) =>
      msg.to === loggedInUser.id ? { ...msg, read: true } : msg
    );
    localStorage.setItem(messageStorageKey, JSON.stringify(updatedAllMessages));
    const updatedUserMessages = updatedAllMessages.filter((msg) => msg.to === loggedInUser.id);
    setMessages(updatedUserMessages);
    setShowInbox(!showInbox);
  };

  const unreadCount = messages.filter((msg) => !msg.read).length;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">👤 Profile</h2>
        <Link to="/space" className="btn btn-outline-secondary">⬅ Back to Space</Link>
      </div>

      <div className="card shadow-sm p-4">
        <div className="text-center">
          <img
            src={formData.avatar}
            alt="Profile"
            className="rounded-circle mb-3"
            width="100"
            height="100"
          />
          {isEditMode && isOwnProfile && (
            <input
              type="file"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          )}

          <h3>
            {isEditMode && isOwnProfile ? (
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              profile.name
            )}
          </h3>
        </div>

        <hr />

        <div className="row">
          {[
            ["College", "college"],
            ["University", "university"],
            ["Course", "course"],
            ["Branch", "branch"],
            ["Semester/Year", "year"],
            ["Batch", "batch"],
            ["Interests", "interests"],
            ["Future Plans", "futurePlans"],
            ["City", "city"],
            ["Area", "area"],
          ].map(([label, key]) => (
            <div className="col-md-6 mb-3" key={key}>
              <strong>{label}:</strong>{" "}
              {isEditMode && isOwnProfile ? (
                <input
                  className="form-control"
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                />
              ) : (
                <span className="ms-2 text-muted">{profile[key]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-3">
          {isOwnProfile ? (
            <>
              <button className="btn btn-warning me-2" onClick={() => setIsEditMode(!isEditMode)}>
                {isEditMode ? "Cancel" : "Edit Profile"}
              </button>
              {isEditMode && (
                <button className="btn btn-success" onClick={handleSave}>Save</button>
              )}
              <button className="btn btn-info ms-2" onClick={handleInboxToggle}>
                📥 Inbox {unreadCount > 0 && <span className="badge bg-danger ms-1">New</span>}
              </button>
            </>
          ) : !isMessaging && (
            <button className="btn btn-outline-primary" onClick={() => setIsMessaging(true)}>
              Message
            </button>
          )}
        </div>

        {/* Messaging Form */}
        {isMessaging && !isOwnProfile && (
          <div className="card mt-4 p-3">
            <h5>📨 Send Message to {profile.name}</h5>
            <div className="form-group mt-2">
              <label>Subject</label>
              <input
                className="form-control"
                value={messageForm.subject}
                onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
              />
            </div>
            <div className="form-group mt-2">
              <label>Message</label>
              <textarea
                className="form-control"
                rows="4"
                value={messageForm.body}
                onChange={(e) => setMessageForm({ ...messageForm, body: e.target.value })}
              />
            </div>
            <div className="mt-3">
              <button className="btn btn-success me-2" onClick={handleSendMessage}>Send</button>
              <button className="btn btn-secondary" onClick={() => setIsMessaging(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Inbox (Only for own profile) */}
        {isOwnProfile && showInbox && (
          <div className="card mt-4 p-3">
            <h5>📥 Inbox Messages</h5>
            {messages.length === 0 ? (
              <p className="text-muted">No messages yet.</p>
            ) : (
              <ul className="list-group">
                {messages.map((msg, i) => {
                  const sender = usersDB.find((u) => u.id === msg.from);
                  return (
                    <li key={i} className="list-group-item">
                      <strong>From:</strong> {sender?.name || "Unknown"} <br />
                      <strong>Subject:</strong> {msg.subject} <br />
                      <strong>Message:</strong> {msg.body} <br />
                      <small className="text-muted">📅 {msg.timestamp}</small>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerProfile;
