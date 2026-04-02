import { Types } from "mongoose";

export enum BookingStatus {
  Initiated = "INITIATED",   // user room select (temporary)
  Pending   = "PENDING",     // booking created, payment pending
  Confirmed = "CONFIRMED",   // payment success → room locked
  Cancelled = "CANCELLED",   // user/admin cancelled
  Expired   = "EXPIRED",     // payment timeout
}



export interface IBookingRooms {
  roomId: Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
}

export interface IBooking {
  _id: string;
  userId: Types.ObjectId;
  rooms: IBookingRooms[];
  totalAmount: number;
  nights: number;
  postcode: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  bookingStatus: BookingStatus;
  transactionId?: string;
  refundable: boolean; // <-- refundable flag
  refundPercentage: number; // <-- how much to refund if canceled
}