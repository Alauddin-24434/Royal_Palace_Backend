import mongoose, { Schema, Document, InferSchemaType } from "mongoose";
import { BedType, RoomStatus, RoomType } from "../interfaces/room.interfaces";

const RoomSchema = new Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    floor: { type: Number, required: true },
    title: { type: String, required: true },
    images: { type: [String], default: [] },
    features: { type: [String], default: [] },
    description: { type: String, default: "" },
    type: {
      type: String,
      enum: Object.values(RoomType),
      required: true,
      index: true,
    },
    price: { type: Number },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    maxOccupancy: { type: Number },
    bedType: { type: String, enum: Object.values(BedType), required: true },
    bedCount: { type: Number, required: true },
    roomStatus: {
      type: String,
      enum: Object.values(RoomStatus),
      default: RoomStatus.Active,
    },
  },
  {
    timestamps: true,
  }
);

// Auto calculate maxOccupancy
RoomSchema.pre("save", function (next) {
  this.maxOccupancy = this.adults + this.children;
  next();
});

// Inferred Document Type
export type RoomDocument = InferSchemaType<typeof RoomSchema> & Document;

const RoomModel = mongoose.model<RoomDocument>("Room", RoomSchema);
export default RoomModel;
