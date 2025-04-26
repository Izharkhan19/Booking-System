import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { getBookings, getRooms } from "../utils/localStorageUtils";

function BookingView() {
  const { id } = useParams();
  const bookings = getBookings();
  const rooms = getRooms();

  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <div>
        <h2>Booking Not Found</h2>
        <Button as={Link} to="/bookings" variant="secondary">
          Back to Bookings
        </Button>
      </div>
    );
  }

  const room = rooms.find((r) => r.id === booking.roomId);

  return (
    <Card>
      <Card.Header>
        <h2>Booking Details</h2>
      </Card.Header>
      <Card.Body>
        <p>
          <strong>Room:</strong> {room?.name || "Unknown"}
        </p>
        <p>
          <strong>Date:</strong> {booking.date}
        </p>
        <p>
          <strong>Start Time:</strong> {booking.startTime}
        </p>
        <p>
          <strong>End Time:</strong> {booking.endTime}
        </p>
        <p>
          <strong>Title:</strong> {booking.title || "No Title"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {booking.description || "No Description"}
        </p>
        <Button as={Link} to="/bookings" variant="secondary">
          Back to Bookings
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookingView;
