import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "bootstrap/dist/css/bootstrap.min.css";

const dummyUsers = [
  {
    email: "learner@example.com",
    name: "Rohit Srivastava",
    username: "rohit_dev",
    avatar: "https://i.pravatar.cc/150?img=8",
    role: "Learner",
    bio: "Btech CSE || PTU'27 Mohali || Technology Geek",
    location: "New Delhi, Delhi",
  },
  {
    email: "mentor@example.com",
    name: "Ankit Sharma",
    username: "ankit_mentor",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "Mentor",
    bio: "Software Developer | Fullstack Mentor @Codegnan",
    location: "Hyderabad, India",
  },
  {
    email: "preeti@example.com",
    name: "Preeti Sharma",
    username: "preeti_mentor",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "Mentor",
    bio: "Software Developer | Fullstack Mentor @Codegnan",
    location: "Hyderabad, India",
  },
];

const defaultPosts = [
  {
    id: 1,
    content: "Preparing for Your #Frontend Interview? Check out this complete roadmap to ace your next role!",
    author: dummyUsers[1],
    timestamp: "4h ago",
    type: "roadmap",
    reactions: { likes: 90, comments: 12 },
    imageUrl: "",
  },
  {
    id: 2,
    content: "DSA Cracker Sheet 🧠📄 | Click to download",
    author: dummyUsers[2],
    timestamp: "2d ago",
    type: "document",
    reactions: { likes: 42, comments: 7 },
    imageUrl: "",
  },
  {
    id: 3,
    content: "DSA Roadmap 🧠📄 | Click to download",
    author: dummyUsers[2], // ✅ Changed from dummyUsers[3] to [2]
    timestamp: "3d ago",
    type: "document",
    reactions: { likes: 42, comments: 7 },
    imageUrl: "",
  },
];

const currentUser = dummyUsers[0];

const messageStorageKey = "messages";

function Space() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState("discussion");
  const [filter] = useState("all");
  const [roleFilter] = useState("all");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("posts");
    if (stored) setPosts(JSON.parse(stored));
    else {
      setPosts(defaultPosts);
      localStorage.setItem("posts", JSON.stringify(defaultPosts));
    }

    const storedMessages = JSON.parse(localStorage.getItem(messageStorageKey)) || [];
    setMessages(storedMessages);
    const unreadMessages = storedMessages.filter((msg) => !msg.read && msg.to === currentUser.email);
    setUnreadCount(unreadMessages.length);
  }, []);

  const handlePost = () => {
    if (!currentUser) {
      alert("Please log in to post.");
      return;
    }
    if (!newPost) return;

    const newId = Date.now();
    const imageUrl = uploadImage ? URL.createObjectURL(uploadImage) : "";

    const post = {
      id: newId,
      content: newPost,
      author: currentUser,
      timestamp: "Just now",
      type: postType,
      reactions: { likes: 0, comments: 0 },
      imageUrl,
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setNewPost("");
    setImagePreview(null);
    setUploadImage(null);
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleEdit = (id, newContent) => {
    if (!newContent) return;
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, content: newContent } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        post.reactions.likes += 1;
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleComment = (id) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        post.reactions.comments += 1;
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleInboxClick = () => {
    const updatedMessages = messages.map((msg) => {
      if (msg.to === currentUser.email) {
        return { ...msg, read: true };
      }
      return msg;
    });
    setMessages(updatedMessages);
    localStorage.setItem(messageStorageKey, JSON.stringify(updatedMessages));
    setUnreadCount(0);
  };

  const filteredPosts = posts.filter(
    (p) =>
      (filter === "all" || p.type === filter) &&
      (roleFilter === "all" || p.author.role === roleFilter)
  );

  return (
    <div className="container-fluid bg-dark text-white py-4" style={{ minHeight: "100vh" }}>
      <h2 className="text-center mb-4">🚀 Async Learning Space</h2>

      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 px-3">
          <div className="card text-dark mb-4">
            <div className="card-body text-center">
              <Link to="/LearnerProfile">
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="rounded-circle mb-3"
                  width="80"
                  height="80"
                  onError={(e) => (e.target.src = "https://i.pravatar.cc/150")}
                />
              </Link>
              <h5>{currentUser.name}</h5>
              <p className="text-muted">{currentUser.bio}</p>
              <small className="text-muted">📍 {currentUser.location}</small>
              <hr />
              <p><strong>Profile viewers:</strong> 20</p>
              <p><strong>Post impressions:</strong> 70</p>

              <div className="mt-3">
                <button className="btn btn-info" onClick={handleInboxClick}>
                  📥 Inbox {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="col-md-6">
          <div className="card text-dark mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="rounded-circle me-2"
                  width="50"
                  height="50"
                  onError={(e) => (e.target.src = "https://i.pravatar.cc/150")}
                />
                <textarea
                  className="form-control"
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-between">
                <select value={postType} onChange={(e) => setPostType(e.target.value)} className="form-select w-25">
                  <option value="discussion">Discussion</option>
                  <option value="document">Document</option>
                  <option value="roadmap">Roadmap</option>
                  <option value="feedback">Feedback</option>
                </select>
                <input type="file" onChange={handleFileChange} />
                {imagePreview && <img src={imagePreview} alt="preview" width="100" />}
                <button className="btn btn-primary" onClick={handlePost}>Post</button>
              </div>
            </div>
          </div>

          {filteredPosts.map((post) => (
            <div key={post.id} className="card text-dark mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <Link to="/LearnerProfile">
                    <img
                      src={post?.author?.avatar}
                      alt="avatar"
                      className="rounded-circle me-2"
                      width="50"
                      height="50"
                      onError={(e) => (e.target.src = "https://i.pravatar.cc/150")}
                    />
                  </Link>
                  <div>
                    <strong>{post?.author?.name}</strong>
                    <div className="text-muted">@{post?.author?.username} · {post.timestamp}</div>
                  </div>
                </div>
                <ReactMarkdown>{post.content}</ReactMarkdown>
                {post.imageUrl && <img src={post.imageUrl} alt="attachment" className="img-fluid mt-2" />}
                <div className="d-flex justify-content-between mt-2 text-muted">
                  <button onClick={() => handleLike(post.id)} className="btn btn-sm btn-light">👍 {post.reactions.likes}</button>
                  <button onClick={() => handleComment(post.id)} className="btn btn-sm btn-light">💬 {post.reactions.comments}</button>
                  <button onClick={() => handleDelete(post.id)} className="btn btn-sm btn-danger">Delete</button>
                  <button onClick={() => handleEdit(post.id, prompt("Edit your post:", post.content))} className="btn btn-sm btn-warning">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Section */}
        <div className="col-md-3 px-3">
          <div className="card text-dark">
            <div className="card-body">
              <h5>Trending Now 🔥</h5>
              <ul className="list-unstyled">
                <li>📈 India's top midsize companies</li>
                <li>🛒 Supermarkets lose q-comm space</li>
                <li>🌾 Agrifood startups raise funds</li>
                <li>💍 Jewellery exports decline</li>
                <li>🚗 BluSmart hit by ops shake-up</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Space;
