// Navbar.js
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/">
        Meeting Rooms & Bookings
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/rooms">
            Rooms
          </Nav.Link>
          <Nav.Link as={Link} to="/bookings">
            Bookings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
