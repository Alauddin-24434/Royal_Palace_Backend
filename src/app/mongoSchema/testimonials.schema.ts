import { model, Schema } from "mongoose";
import { ITestimonial } from "../interfaces/testimonial.interfaces";

const testimonialSchema = new Schema<ITestimonial>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: [true, "UserName is required"] },
    userImage: { type: String, required: [true, "User Image is required"] },
    roomId: { type: String, required: [true, "Room ID is required"] },
    rating: { type: Number, required: [true, "Rating is required"] },
    reviewText: { type: String, required: [true, "Review is required"] },
    reviewDate: { type: String, required: [true, "Review Date is required"] },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

const testimonialModel = model<ITestimonial>("Testimonial", testimonialSchema);
export default testimonialModel;
