import React from 'react';
import { Table, Card } from 'react-bootstrap';

const history = [
  { date: '2025-04-10', mentor: 'Dr. Smith', feedback: 'Great session on recursion!', rating: 5 },
  { date: '2025-04-05', mentor: 'Alice Ray', feedback: 'Helped with problem-solving skills.', rating: 4 },
];

export default function SessionHistory() {
  return (
    <Card>
      <Card.Header>📜 Session History</Card.Header>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mentor</th>
            <th>Feedback</th>
            <th>Rating ⭐</th>
          </tr>
        </thead>
        <tbody>
          {history.map((session, i) => (
            <tr key={i}>
              <td>{session.date}</td>
              <td>{session.mentor}</td>
              <td>{session.feedback}</td>
              <td>{session.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
