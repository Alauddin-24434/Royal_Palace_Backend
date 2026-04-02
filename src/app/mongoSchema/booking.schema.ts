import mongoose, { model, Schema, Types } from "mongoose";
import { BookingStatus, IBooking } from "../interfaces/booking.interfcae";

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    rooms: [
      {
        roomId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
          required: true,
        },
        checkInDate: { type: Date, required: true },
        checkOutDate: { type: Date, required: true },
      },
    ],
  
    totalAmount: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postcode:{ type: Number, required: true },

    transactionId: { type: String, unique: true },
    bookingStatus: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.Pending,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = model<IBooking>("Booking", bookingSchema);

export default BookingModel;
