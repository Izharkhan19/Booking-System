import { useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getBookings,
  getRooms,
  saveBookings,
} from "../utils/localStorageUtils";

function BookingList() {
  const [bookings, setBookings] = useState(getBookings());
  const [filterDate, setFilterDate] = useState("");
  const rooms = getRooms();

  const handleDelete = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    saveBookings(updated);
    setBookings(updated);
  };

  const filteredBookings = filterDate
    ? bookings.filter((b) => b.date === filterDate)
    : bookings;

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>Bookings</h2>
        <Button as={Link} to="/bookings/add" variant="primary" className="mb-3">
          New Booking
        </Button>
      </div>
      <Form.Control
        type="date"
        className="mb-3"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <Table striped bordered>
        <thead>
          <tr>
            <th>Room</th>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Title</th>
            <th className="d-flex justify-content-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((b) => (
            <tr key={b.id}>
              <td>{rooms.find((r) => r.id === b.roomId)?.name || "Unknown"}</td>
              <td>{b.date}</td>
              <td>{b.startTime}</td>
              <td>{b.endTime}</td>
              <td>{b.title}</td>
              <td className="d-flex justify-content-end">
                <Button
                  as={Link}
                  to={`/bookings/view/${b.id}`}
                  size="sm"
                  variant="info"
                  className="me-2"
                >
                  View
                </Button>
                <Button
                  as={Link}
                  to={`/bookings/edit/${b.id}`}
                  size="sm"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(b.id)}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BookingList;
