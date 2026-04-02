import { Request, Response } from "express";
import { catchAsyncHandeller } from "../utils/handeller/catchAsyncHandeller";
import { amenitieServices } from "../services/amenitie.services";

// =============================================Create Amenitie=====================================================
const createAmenitie = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const imageUrl = req.file?.path;

    const serviceData = {
      ...req.body,
      image: imageUrl,
      pricePerDay: Number(req.body.pricePerDay),
    };

    const service = await amenitieServices.crateAmenitie(serviceData);

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  }
);

// ===============================================Find all Amenities=======================================================

const getAllAmenities = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const services = await amenitieServices.getAllAmenities();
    res.status(200).json({
      success: true,
      message: "All services fetched successfully",
      data: services,
    });
  }
);

// ==================================================Delete Aminite by Id=======================================================
const deleteAmenitie = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const service = await amenitieServices.deleteAmenities(req.params.id as string);
    console.log("delete", service);

    res.status(200).json({
      success: true,
      message: "Service delete successfully",
      data: service,
    });
  }
);
// ===============================================Update Amenitie by Id=======================================================
const updateAmenitie = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const imageUrl = req.file?.path;

    const updateData = {
      ...req.body,
      pricePerDay: req.body.pricePerDay
        ? Number(req.body.pricePerDay)
        : undefined,
    };

    // If image exists, attach it
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updatedService = await amenitieServices.updateAmenitie(
      id as string,
      updateData
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  }
);

// ==============================export controller=============================
export const amenitieController = {
  createAmenitie,
  updateAmenitie,
  getAllAmenities,
  deleteAmenitie,
};
