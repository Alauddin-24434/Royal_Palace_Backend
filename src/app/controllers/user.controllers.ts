import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import sanitize from "mongo-sanitize";
import { catchAsyncHandeller } from "../utils/handeller/catchAsyncHandeller";

import {
  createAccessToken,
  createRefreshToken,
} from "../utils/jwt/generateTokens";
import { cookieOptions } from "../config/cookie";
import { AppError } from "../error/appError";
import { userServices } from "../services/user.services";
import { IUser } from "../interfaces/user.interfaces";
import { signupValidation } from "../zodValidations/v1/user.validations";

// ================= Registration =====================
// 1️⃣ Catch Async Handler
const regestrationUser = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const validated = signupValidation.parse(req.body);

    const user = await userServices.registerUserIntoDb(validated as IUser);

    const accessToken = createAccessToken({ id: user._id, role: user.role });
    const refreshToken = createRefreshToken({ id: user._id, role: user.role });

    // Set tokens as HttpOnly cookies
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        accessToken,
      },
    });
  }
);

// ================= Login ======================
const loginUser = catchAsyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    const user = await userServices.loginUserByEmail(email, password);

    const payload = { id: user._id, role: user.role };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        accessToken,
      },
    });
  }
);

//================================find single user=============================================
const getSingleUser = catchAsyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("🔍 Fetching user with query:", req.query);
    const query = sanitize(req.query);
    const user = await userServices.getSingleUser(query);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  }
);

// ===================================================== find all user==========================================
const getAllUsers = catchAsyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userServices.getAllUsers(req.query);
    // logger.info("All users fetched successfully");

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: users,
    });
  }
);

// =====================================================delete user=================================================
const deleteUser = catchAsyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = sanitize(req.params.id);

    const deletedUser = await userServices.deleteUserById(id as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  }
);

//=========================================== update user================================================================
const updateUser = catchAsyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = sanitize(req.params.id);

    let updatedData;
    const imageUrl = req.file?.path;
    if (imageUrl) {
      updatedData = sanitize({ ...req.body, image: imageUrl });
    } else {
      updatedData = sanitize(req.body);
    }

    const user = await userServices.updateUserById(id as string, updatedData);
    const payload = { id: user._id, role: user.role };
    const refreshToken = createRefreshToken(payload);
    const accessToken = createAccessToken(payload);

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user,
        accessToken,
      },
    });
  }
);

// ======================================================refresh token ==============================================
export const refreshAccessToken = catchAsyncHandeller(
  async (req: Request, res: Response) => {
    const refreshTokenRaw =
      req.cookies?.refreshToken || req.headers["x-refresh-token"];
    const refreshToken = sanitize(refreshTokenRaw);

    if (!refreshToken) {
      throw new AppError("Refresh token missing", 401);
    }

    const user = await userServices.requestRefreshToken(refreshToken);

    const payload = { id: user._id, role: user.role };
    const accessToken = createAccessToken(payload);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        user,
        accessToken,
      },
    });
  }
);

const logoutUser = catchAsyncHandeller(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  }
);

// ======================export controller===============================================
export const userController = {
  regestrationUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  updateUser,
  refreshAccessToken,
  logoutUser,
};
