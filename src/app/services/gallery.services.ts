import { IGallery } from "../interfaces/gallery.interfaces";
import GalleryModel from "../mongoSchema/gallery.schema";

// ================================================Create gallery=============================================
const createGallery = async (data: IGallery) => {
  const gallery = await GalleryModel.create(data);
  return gallery;
};

// =====================================Get all galleries==========================================
const getAllGalleries = async () => {
  return await GalleryModel.find().sort({ createdAt: -1 });
};

// ====================================Get gallery by ID==================================================
const getGalleryById = async (id: string) => {
  return await GalleryModel.findById(id);
};

// ==========================================Delete gallery===========================================
const deleteGalleryById = async (id: string) => {
  return await GalleryModel.findByIdAndDelete(id);
};

// ============================Export Services===============================
export const galleryService = {
  createGallery,
  getAllGalleries,
  getGalleryById,
  deleteGalleryById,
};
