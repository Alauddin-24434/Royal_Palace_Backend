import { Router } from "express";
import { testimonialController } from "../controllers/testimonial.controllers";

const router = Router();


// ===========================Create a new testimonial==============================
router.post("/", testimonialController.testimonialCreate);

// =========================Get all testimonials==============================
router.get("/", testimonialController.findAllTestimonials);

//======================= Get testimonials by specific room ID===============================
router.get("/:id", testimonialController.findTestimonialsByRoomId);
// =======================Delete testimonial by ID (hard delete)==============================
router.delete("/:id", testimonialController.deleteTestimonialById); // 👈 added line

export const testimonialRoute= router;
