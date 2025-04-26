import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BookingModal = ({ showModal, handleClose, handleSave, rooms, bookingToEdit }) => {
  const [roomId, setRoomId] = useState(bookingToEdit?.roomId || '');
  const [date, setDate] = useState(bookingToEdit?.date || '');
  const [startTime, setStartTime] = useState(bookingToEdit?.startTime || '');
  const [endTime, setEndTime] = useState(bookingToEdit?.endTime || '');
  const [title, setTitle] = useState(bookingToEdit?.title || '');
  const [description, setDescription] = useState(bookingToEdit?.description || '');

  const handleSubmit = () => {
    if (roomId && date && startTime && endTime) {
      handleSave({
        id: bookingToEdit?.id || Date.now(),
        roomId,
        date,
        startTime,
        endTime,
        title,
        description,
      });
      handleClose();
    } else {
      alert('Please fill all required fields');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{bookingToEdit ? 'Edit Booking' : 'New Booking'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Room</Form.Label>
            <Form.Select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Title (optional)</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {bookingToEdit ? 'Save Changes' : 'Book Room'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
