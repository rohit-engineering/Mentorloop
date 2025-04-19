import React, { useState } from "react";

function DiscussionThread() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  const handlePost = () => {
    if (input.trim()) {
      setPosts([...posts, { text: input, timestamp: new Date() }]);
      setInput("");
    }
  };

  return (
    <div className="mb-5">
      <h3>Discussion Threads</h3>
      <textarea
        className="form-control mb-2"
        placeholder="Post a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-secondary mb-3" onClick={handlePost}>Post</button>
      <ul className="list-group">
        {posts.map((post, index) => (
          <li key={index} className="list-group-item">
            <p>{post.text}</p>
            <small className="text-muted">{post.timestamp.toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiscussionThread;
