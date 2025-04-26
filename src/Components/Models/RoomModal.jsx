import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RoomModal = ({ showModal, handleClose, handleSave, roomToEdit }) => {
  const [name, setName] = useState(roomToEdit?.name || '');
  const [capacity, setCapacity] = useState(roomToEdit?.capacity || '');

  const handleSubmit = () => {
    if (name && capacity) {
      handleSave({ id: roomToEdit?.id || Date.now(), name, capacity });
      handleClose();
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{roomToEdit ? 'Edit Room' : 'Add Room'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Room Name</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {roomToEdit ? 'Save Changes' : 'Add Room'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomModal;
