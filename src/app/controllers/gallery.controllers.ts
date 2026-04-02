import { Request, Response } from "express";
import { catchAsyncHandeller } from "../utils/handeller/catchAsyncHandeller";
import { galleryService } from "../services/gallery.services";

// ================================================Create gallery=============================================
const createGallery = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const imageUrl = req.file?.path;

    const bodyData = {
      ...req.body,
      image: imageUrl,
    };

    const result = await galleryService.createGallery(bodyData);
    res.status(201).json({
      success: true,
      message: "Gallery item created successfully",
      data: result,
    });
  }
);

// =====================================Get all galleries==========================================
const getAllGalleries = catchAsyncHandeller(
  async (_req: Request, res: Response) => {
    const result = await galleryService.getAllGalleries();
    res.status(200).json({
      success: true,
      message: "Gallery items fetched successfully",
      data: result,
    });
  }
);

// ====================================Get gallery by ID==================================================
const getGalleryById = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await galleryService.getGalleryById(id as string);
    res.status(200).json({
      success: true,
      message: "Gallery item fetched successfully",
      data: result,
    });
  }
);

// ==========================================Delete gallery===========================================
const deleteGalleryById = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await galleryService.deleteGalleryById(id as string);
    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
      data: result,
    });
  }
);

// ============================Export Controller===============================
export const galleryController = {
  createGallery,
  getAllGalleries,
  getGalleryById,
  deleteGalleryById,
};
