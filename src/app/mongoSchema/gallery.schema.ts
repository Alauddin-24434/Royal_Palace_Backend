import mongoose, { Schema } from "mongoose";
import { IGallery } from "../interfaces/gallery.interfaces";

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const GalleryModel = mongoose.model<IGallery>("Gallery", GallerySchema);
export default GalleryModel;
