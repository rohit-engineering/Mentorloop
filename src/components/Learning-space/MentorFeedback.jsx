import React, { useState } from "react";

function MentorFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      setFeedbackList([...feedbackList, { feedback: input, date: new Date() }]);
      setInput("");
    }
  };

  return (
    <div className="mb-5">
      <h3>Mentor Feedback</h3>
      <textarea
        className="form-control mb-2"
        placeholder="Leave feedback..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-info mb-3" onClick={handleSubmit}>Submit Feedback</button>
      <ul className="list-group">
        {feedbackList.map((f, i) => (
          <li key={i} className="list-group-item">
            <p>{f.feedback}</p>
            <small className="text-muted">{f.date.toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MentorFeedback;
