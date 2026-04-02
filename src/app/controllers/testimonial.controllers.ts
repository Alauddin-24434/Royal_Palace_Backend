import { Request, Response } from "express";
import { catchAsyncHandeller } from "../utils/handeller/catchAsyncHandeller";
import { testimonialServices } from "../services/testimonial.services";

// ==============================================Create a new testimonial==========================================
const testimonialCreate = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const body = req.body;
    const result = await testimonialServices.testimonialCreate(body);
    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: result,
    });
  }
);

//====================================================== Get all testimonials===============================================
const findAllTestimonials = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await testimonialServices.findAllTestimonial({
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      data: result,
    });
  }
);

//========================================================== Get testimonials by roomId===========================================
const findTestimonialsByRoomId = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await testimonialServices.findTestimonialByRoomId(id as string);
    res.status(200).json({
      success: true,
      message: `Testimonials for Room ID: ${id} fetched successfully`,
      data: result,
    });
  }
);

//========================================================== Delete testimonial by ID ===========================================
const deleteTestimonialById = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await testimonialServices.deleteTestimonialById(id as string);

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
      data: result,
    });
  }
);

// ==================================================export controller==============================================================
export const testimonialController = {
  testimonialCreate,
  findAllTestimonials,
  findTestimonialsByRoomId,
  deleteTestimonialById,
};
