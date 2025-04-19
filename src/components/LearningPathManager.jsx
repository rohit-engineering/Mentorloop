import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import '../styles/MentorDashboard.css';

const getInitialPaths = () => {
  try {
    const data = JSON.parse(localStorage.getItem("learningPaths"));
    if (Array.isArray(data)) return data;
  } catch (err) {
    console.error("Error parsing localStorage:", err);
  }
  return [];
};

const LearningPathManager = () => {
  const [paths, setPaths] = useState(getInitialPaths());
  const [editingId, setEditingId] = useState(null);

  const savePaths = (newPaths) => {
    localStorage.setItem("learningPaths", JSON.stringify(newPaths));
    setPaths(newPaths);
  };

  const addCourse = () => {
    const newCourse = {
      id: Date.now(),
      title: '',
      days: [{ day: '', topics: [''] }],
    };
    savePaths([...paths, newCourse]);
    setEditingId(newCourse.id);
  };

  const updateCourse = (id, updatedCourse) => {
    const updated = paths.map(course => course.id === id ? updatedCourse : course);
    savePaths(updated);
    setEditingId(null);
  };

  const deleteCourse = (id) => {
    savePaths(paths.filter(course => course.id !== id));
  };

  const handleTopicChange = (course, dayIdx, topicIdx, value) => {
    const updated = { ...course };
    updated.days[dayIdx].topics[topicIdx] = value;
    return updated;
  };

  const handleAddDay = (course) => {
    const updated = { ...course };
    updated.days.push({ day: '', topics: [''] });
    return updated;
  };

  const handleAddTopic = (course, dayIdx) => {
    const updated = { ...course };
    updated.days[dayIdx].topics.push('');
    return updated;
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header className="d-flex justify-content-between">
        <span>📘 Learning Path Management</span>
        <Button size="sm" onClick={addCourse}>Add Course ➕</Button>
      </Card.Header>
      <Card.Body>
        {(paths || []).map((course) => (
          <Card className="mb-3" key={course.id}>
            <Card.Header>
              {editingId === course.id ? (
                <Form.Control
                  type="text"
                  placeholder="Course Title"
                  value={course.title}
                  onChange={(e) => {
                    const updated = { ...course, title: e.target.value };
                    setPaths(paths.map(p => p.id === course.id ? updated : p));
                  }}
                />
              ) : (
                <strong>{course.title}</strong>
              )}
            </Card.Header>
            <Card.Body>
              {editingId === course.id ? (
                <>
                  {(course.days || []).map((dayObj, dayIdx) => (
                    <div key={dayIdx} className="mb-3 border p-2 rounded">
                      <Form.Group className="mb-2">
                        <Form.Label>Day</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g., Monday to Friday"
                          value={dayObj.day}
                          onChange={(e) => {
                            const updated = { ...course };
                            updated.days[dayIdx].day = e.target.value;
                            setPaths(paths.map(p => p.id === course.id ? updated : p));
                          }}
                        />
                      </Form.Group>
                      <Form.Label>Topics</Form.Label>
                      {(dayObj.topics || []).map((topic, topicIdx) => (
                        <Form.Control
                          key={topicIdx}
                          type="text"
                          value={topic}
                          placeholder="Enter topic"
                          onChange={(e) => {
                            const updated = handleTopicChange(course, dayIdx, topicIdx, e.target.value);
                            setPaths(paths.map(p => p.id === course.id ? updated : p));
                          }}
                          className="mb-2"
                        />
                      ))}
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => {
                          const updated = handleAddTopic(course, dayIdx);
                          setPaths(paths.map(p => p.id === course.id ? updated : p));
                        }}
                      >+ Add Topic</Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    className="mb-3"
                    onClick={() => {
                      const updated = handleAddDay(course);
                      setPaths(paths.map(p => p.id === course.id ? updated : p));
                    }}
                  >+ Add Day</Button>
                  <div className="mt-3">
                    <Button size="sm" variant="success" className="me-2" onClick={() => updateCourse(course.id, course)}>Save</Button>
                    <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </>
              ) : (
                <>
                  {(course.days || []).map((day, idx) => (
                    <div key={idx} className="mb-2">
                      <strong>{day.day}:</strong> {(day.topics || []).join(', ')}
                    </div>
                  ))}
                  <Button size="sm" variant="primary" className="me-2" onClick={() => setEditingId(course.id)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => deleteCourse(course.id)}>Delete</Button>
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
};

export default LearningPathManager;
