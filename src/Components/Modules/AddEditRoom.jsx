import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRooms, saveRooms } from '../../utils/localStorageUtils';
import { Form, Button } from 'react-bootstrap';

function AddEditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);

  const [room, setRoom] = useState({ name: '', capacity: '' });

  useEffect(() => {
    if (editing) {
      const rooms = getRooms();
      const found = rooms.find(r => r.id === id);
      if (found) setRoom(found);
    }
  }, [id, editing]);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rooms = getRooms();
    if (editing) {
      const updated = rooms.map(r => r.id === id ? room : r);
      saveRooms(updated);
    } else {
      saveRooms([...rooms, { ...room, id: Date.now().toString() }]);
    }
    navigate('/rooms');
  };

  return (
    <div>
      <h2>{editing ? 'Edit' : 'Add'} Room</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Room Name</Form.Label>
          <Form.Control name="name" value={room.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Capacity</Form.Label>
          <Form.Control name="capacity" value={room.capacity} onChange={handleChange} required type="number" min="1" />
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}

export default AddEditRoom;
