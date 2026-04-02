import { differenceInDays } from "date-fns";
import { AppError } from "../error/appError";

export interface RoomBooking {
  roomId: string;
  price: number;
  checkInDate: string;
  checkOutDate: string;
}

export const calculateTotalAmount = (
  rooms: RoomBooking[],
): number => {
  if (!Array.isArray(rooms) || rooms.length === 0) {
    throw new AppError("No rooms provided for booking", 400);
  }

  let totalAmount = 0;

  for (const room of rooms) {
    const checkIn = new Date(room.checkInDate);
    const checkOut = new Date(room.checkOutDate);

    const nights = differenceInDays(checkOut, checkIn);

    if (Number.isNaN(nights) || nights <= 0) {
      throw new AppError(
        `Invalid check-in/check-out dates for room ${room.roomId}`,
        400,
      );
    }

    if (typeof room.price !== "number" || room.price <= 0) {
      throw new AppError(
        `Invalid price for room ${room.roomId}`,
        400,
      );
    }

    totalAmount += room.price * nights;
  }

  return totalAmount;
};
