import { model, Schema } from "mongoose";
import { IPayment, PaymentStatus } from "../interfaces/payment.interfaces";

const paymentSchema = new Schema<IPayment>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
      required: true,
    },
    transactionId: { type: String },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = model<IPayment>("Payment", paymentSchema);

export default PaymentModel;
