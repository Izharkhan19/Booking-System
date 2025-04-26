import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavigationBar from "./components/Navbar";
// import Home from "./pages/Home";
// import RoomsPage from "./pages/RoomsPage";
// import BookingsPage from "./pages/BookingsPage";
import RoomList from "./Components/RoomList";
import BookingList from "./Components/BookingList";
import AddEditBooking from "./Components/Modules/AddEditBooking";
import AddEditRoom from "./Components/Modules/AddEditRoom";
import NavigationBar from "./Components/MainNavbar";
import Home from "./Components/Home";
import BookingView from "./Components/BookingView";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/rooms/add" element={<AddEditRoom />} />
          <Route path="/rooms/edit/:id" element={<AddEditRoom />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/bookings/add" element={<AddEditBooking />} />
          <Route path="/bookings/edit/:id" element={<AddEditBooking />} />
          <Route path="/bookings/view/:id" element={<BookingView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
