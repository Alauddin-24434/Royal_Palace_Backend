import { z } from "zod";

// ✅ Signup validation
export const signupValidation = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters"),
});

// ✅ Login validation
export const loginValidation = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

// ✅ Update user validation (partial)
export const updateUserValidation = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters")
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
});
