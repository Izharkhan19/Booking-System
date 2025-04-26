// validationUtils.js

export const isBookingValid = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diffMinutes = (endTime - startTime) / (1000 * 60);

  return (
    startTime < endTime &&
    diffMinutes >= 30 &&
    diffMinutes <= 240 &&
    startTime.getHours() >= 8 &&
    endTime.getHours() <= 18
  );
};

export const hasConflict = (newBooking, existingBookings) => {
  return existingBookings.some((b) => {
    if (b.roomId !== newBooking.roomId || b.date !== newBooking.date)
      return false;

    const newStart = new Date(`${newBooking.date}T${newBooking.startTime}`);
    const newEnd = new Date(`${newBooking.date}T${newBooking.endTime}`);
    const existStart = new Date(`${b.date}T${b.startTime}`);
    const existEnd = new Date(`${b.date}T${b.endTime}`);

    return newStart < existEnd && newEnd > existStart;
  });
};
