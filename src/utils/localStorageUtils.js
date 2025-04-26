// localStorageUtils.js

const ROOM_KEY = 'rooms';
const BOOKING_KEY = 'bookings';

export const getRooms = () => JSON.parse(localStorage.getItem(ROOM_KEY)) || [];
export const saveRooms = (rooms) => localStorage.setItem(ROOM_KEY, JSON.stringify(rooms));

export const getBookings = () => JSON.parse(localStorage.getItem(BOOKING_KEY)) || [];
export const saveBookings = (bookings) => localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
