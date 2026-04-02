import { IBookingRooms } from "../../interfaces/booking.interfcae";

export function calculateDuration(rooms: IBookingRooms[]): number {
  if (!rooms || rooms.length === 0) return 0;
  const checkIn = new Date(rooms[0].checkInDate);
  const checkOut = new Date(rooms[0].checkOutDate);
  const diffMs = checkOut.getTime() - checkIn.getTime();
  return Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24)), 0);
}

export function calculateDaysBeforeCheckIn(rooms: IBookingRooms[]): number {
  if (!rooms || rooms.length === 0) return 0;
  const checkIn = new Date(rooms[0].checkInDate);
  const now = new Date();
  const diffMs = checkIn.getTime() - now.getTime();
  return Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24)), 0);
}
