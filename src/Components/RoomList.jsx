import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getRooms, saveRooms } from "../utils/localStorageUtils";

function RoomList() {
  const [rooms, setRooms] = useState(getRooms());

  const handleDelete = (id) => {
    const updated = rooms.filter((r) => r.id !== id);
    saveRooms(updated);
    setRooms(updated);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Rooms</h2>
        <Button as={Link} to="/rooms/add" variant="primary" className="mb-3">
          Add Room
        </Button>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th className="d-flex justify-content-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>

              <td className="d-flex justify-content-end">
                <Button
                  as={Link}
                  to={`/rooms/edit/${room.id}`}
                  size="sm"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(room.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default RoomList;
