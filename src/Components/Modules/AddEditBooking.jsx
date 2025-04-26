import { useState, useEffect } from "react";
import {
  getBookings,
  saveBookings,
  getRooms,
} from "../../utils/localStorageUtils";
import { Form, Button, Alert } from "react-bootstrap";
import { isBookingValid, hasConflict } from "../../utils/validationUtils";
import { useNavigate, useParams } from "react-router-dom";

function AddEditBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);

  const [booking, setBooking] = useState({
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const rooms = getRooms();

  useEffect(() => {
    if (editing) {
      const bookings = getBookings();
      const found = bookings.find((b) => b.id === id);
      if (found) setBooking(found);
    }
  }, [id, editing]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookings = getBookings();

    if (
      !isBookingValid(
        `${booking.date}T${booking.startTime}`,
        `${booking.date}T${booking.endTime}`
      )
    ) {
      setError(
        "Invalid time selection. Check business hours, duration (30 mins - 4 hours) and start < end."
      );
      return;
    }

    const newBooking = { ...booking, id: editing ? id : Date.now().toString() };
    const checkConflicts = hasConflict(
      newBooking,
      editing ? bookings.filter((b) => b.id !== id) : bookings
    );

    if (checkConflicts) {
      setError("Conflict detected with existing booking.");
      return;
    }

    if (editing) {
      const updated = bookings.map((b) => (b.id === id ? newBooking : b));
      saveBookings(updated);
    } else {
      saveBookings([...bookings, newBooking]);
    }

    navigate("/bookings");
  };

  return (
    <div>
      <h2>{editing ? "Edit" : "New"} Booking</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Room</Form.Label>
          <Form.Select
            name="roomId"
            value={booking.roomId}
            onChange={handleChange}
            required
          >
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={booking.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            name="startTime"
            value={booking.startTime}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            name="endTime"
            value={booking.endTime}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Title (optional)</Form.Label>
          <Form.Control
            name="title"
            value={booking.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description (optional)</Form.Label>
          <Form.Control
            name="description"
            value={booking.description}
            onChange={handleChange}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}

export default AddEditBooking;
