import React from 'react';
import { ProgressBar, Card } from 'react-bootstrap';

const learningPaths = [
  { subject: 'Python Basics', progress: 75 },
  { subject: 'Data Structures', progress: 40 },
];

export default function ProgressTracker() {
  return (
    <Card>
      <Card.Header>📊 Learning Progress</Card.Header>
      <Card.Body>
        {learningPaths.map((path, i) => (
          <div key={i} className="mb-3">
            <strong>{path.subject}</strong>
            <ProgressBar now={path.progress} label={`${path.progress}%`} />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
