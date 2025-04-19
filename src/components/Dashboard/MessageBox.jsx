import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

export default function MessageBox() {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      alert('Message sent to mentor!');
      setMessage('');
    }
  };

  return (
    <Card>
      <Card.Header>💬 Ask Your Mentor</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSend}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mt-2" variant="primary">Send</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
