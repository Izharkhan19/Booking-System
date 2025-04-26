import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const RoomForm = ({ rooms, setRooms }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !capacity) return alert("Enter all fields");

    setRooms([...rooms, { id: Date.now(), name, capacity }]);
    setName("");
    setCapacity("");
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Add New Room</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Add Room
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RoomForm;
