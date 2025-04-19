import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AvailabilityManager = () => {
  const [slots, setSlots] = useState(() => JSON.parse(localStorage.getItem('availabilitySlots')) || []);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newSlot, setNewSlot] = useState({
    date: null,
    from: '',
    to: ''
  });

  const saveToStorage = (updatedSlots) => {
    localStorage.setItem('availabilitySlots', JSON.stringify(updatedSlots));
    setSlots(updatedSlots);
  };

  const handleAddSlot = () => {
    if (!newSlot.date || !newSlot.from || !newSlot.to) return alert('Please complete all fields');
    const updatedSlots = [...slots, newSlot];
    saveToStorage(updatedSlots);
    setNewSlot({ date: null, from: '', to: '' });
  };

  const handleUpdateSlot = () => {
    const updatedSlots = [...slots];
    updatedSlots[editingIndex] = newSlot;
    saveToStorage(updatedSlots);
    setEditingIndex(null);
    setNewSlot({ date: null, from: '', to: '' });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewSlot(slots[index]);
  };

  const handleDelete = (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    saveToStorage(updatedSlots);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="d-flex justify-content-between">
        <span>🕐 Availability Setup</span>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Select Date</Form.Label>
              <DatePicker
                selected={newSlot.date ? new Date(newSlot.date) : null}
                onChange={(date) => setNewSlot({ ...newSlot, date })}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
              />
            </Col>
            <Col md={4}>
              <Form.Label>From</Form.Label>
              <Form.Control
                type="time"
                value={newSlot.from}
                onChange={(e) => setNewSlot({ ...newSlot, from: e.target.value })}
              />
            </Col>
            <Col md={4}>
              <Form.Label>To</Form.Label>
              <Form.Control
                type="time"
                value={newSlot.to}
                onChange={(e) => setNewSlot({ ...newSlot, to: e.target.value })}
              />
            </Col>
          </Row>
          <Button
            variant={editingIndex !== null ? 'warning' : 'primary'}
            onClick={editingIndex !== null ? handleUpdateSlot : handleAddSlot}
          >
            {editingIndex !== null ? 'Update Slot' : 'Add Slot'}
          </Button>
        </Form>

        <hr />

        {slots.length === 0 ? (
          <p className="text-muted">No availability slots added yet.</p>
        ) : (
          <ul className="list-group">
            {slots.map((slot, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <strong>{new Date(slot.date).toLocaleDateString()}</strong> | {slot.from} - {slot.to}
                </span>
                <div>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default AvailabilityManager;
