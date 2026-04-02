import { NextFunction, Request, Response } from "express";
import { sanitizeInput } from "../utils/sanitizeInput";

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.body = sanitizeInput(req.body); // ✅ safe
  next();
};
