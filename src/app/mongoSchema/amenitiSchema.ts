import { model, Schema } from "mongoose";
import { IAmenities } from "../interfaces/amenities.interface";

const amenitiesSchema = new Schema<IAmenities>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    pricePerDay: { type: Number, required: true },
    isServiceFree: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const AmenitiesModel = model<IAmenities>("Amenities", amenitiesSchema);
export default AmenitiesModel;
