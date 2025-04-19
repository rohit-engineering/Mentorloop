import React, { useState } from "react";

function SharedResources() {
  const [resources, setResources] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResources([...resources, file.name]);
    }
  };

  return (
    <div className="mb-5">
      <h3>Shared Resources</h3>
      <input type="file" className="form-control mb-2" onChange={handleUpload} />
      <ul className="list-group">
        {resources.map((res, index) => (
          <li key={index} className="list-group-item">{res}</li>
        ))}
      </ul>
    </div>
  );
}

export default SharedResources;
