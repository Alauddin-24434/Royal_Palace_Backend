import { Request, Response } from "express";
import { catchAsyncHandeller } from "../utils/handeller/catchAsyncHandeller";
import { AppError } from "../error/appError";
import { dashboardService } from "../services/dashboard.services";

const getDashboardData = catchAsyncHandeller(async (req: Request, res: Response) => {
  // const role = req.user?.role; // Role comes from authenticated user
  const role = req.user?.role;
  const userId = req.user?._id; // Also from auth middleware

  if (!role) {
    throw new AppError("User role is required", 400);
  }

  const data = await dashboardService.dashboardOverviewByRole(role, userId);

  res.status(200).json({
    success: true,
    ...data,
  });
});

export const dashboardController = {
  getDashboardData,
};
