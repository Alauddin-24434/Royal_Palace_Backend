// utils/roomsCalculates.ts
import { calculateNights } from "./calculateNights";

interface RoomInput {
  roomId: string;
  price: number;
  checkInDate: string;
  checkOutDate: string;
}

export const roomsCalculates = (rooms: RoomInput[]) => {
  return rooms.map((room) => {
    const nights = calculateNights(
      room.checkInDate,
      room.checkOutDate,
    );

    return {
      roomId: room.roomId,
      price: room.price,
      checkInDate: room.checkInDate,
      checkOutDate: room.checkOutDate,
      nights,
      subTotal: room.price * nights,
    };
  });
};
