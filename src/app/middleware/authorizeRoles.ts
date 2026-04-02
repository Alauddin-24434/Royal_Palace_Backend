// middlewares/authorizeRoles.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/appError";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      role?: string;
      [key: string]: any;
    }
    interface Request {
      user?: User;
    }
  }
}
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    console.log("User role in authorizeRoles:", userRole);

    if (!userRole || !allowedRoles.includes(userRole)) {
      console.log("Unauthorized role, throwing error");
      return next(new AppError("You do not have permission to access this resource", 403));
    }

    console.log("User authorized");
    next();
  };
};
