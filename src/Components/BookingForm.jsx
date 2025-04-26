import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const BookingForm = ({ rooms, bookings, setBookings }) => {
  const [roomId, setRoomId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomId || !date || !startTime || !endTime) return alert('Fill required fields');

    setBookings([...bookings, {
      id: Date.now(),
      roomId,
      date,
      startTime,
      endTime,
      title,
      description,
    }]);
    
    setRoomId('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setTitle('');
    setDescription('');
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>New Booking</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Room</Form.Label>
            <Form.Select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              <option value="">Select Room</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Start Time</Form.Label>
            <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>End Time</Form.Label>
            <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Title (optional)</Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>

          <Button type="submit" variant="success">Book Room</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookingForm;
