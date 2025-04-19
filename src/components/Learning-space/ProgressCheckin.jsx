import React, { useState } from "react";

function ProgressCheckin() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { task: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="mb-5">
      <h3>Progress Check-ins</h3>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Assign a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="btn btn-success mb-3" onClick={addTask}>Add Task</button>
      <ul className="list-group">
        {tasks.map((t, i) => (
          <li
            key={i}
            className={`list-group-item d-flex justify-content-between align-items-center ${t.completed ? 'list-group-item-success' : ''}`}
          >
            {t.task}
            <button className="btn btn-sm btn-outline-primary" onClick={() => toggleComplete(i)}>
              {t.completed ? "Undo" : "Mark as Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgressCheckin;
