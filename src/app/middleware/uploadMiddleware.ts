import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: () => ({
    folder: "portfolio-projects",
    // allowed_formats: ["jpg", "jpeg", "png", "gif", "svg"],
  }),
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5 MB
  },
});

export default upload;
