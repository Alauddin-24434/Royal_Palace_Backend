import jwt from "jsonwebtoken";
import { AppError } from "../error/appError";
import { envVariable } from "../config";

import { catchAsyncHandeller } from "../utils/handeller/catchAsyncHandeller";
import UserModel from "../mongoSchema/user.schema";

interface JwtDecodedPayload {
  id: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export const authenticateUser = catchAsyncHandeller(async (req, res, next) => {
  let token: string | undefined;

  // 1️⃣ Try getting token from Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2️⃣ Fallback: get token from cookie
  if (!token) {
    token = req.cookies?.accessToken;
  }

  // 3️⃣ No token at all
  if (!token) throw new AppError("Unauthorized: Token missing", 401);

  let decoded: JwtDecodedPayload;
  try {
    decoded = jwt.verify(
      token,
      envVariable.JWT_ACCESS_TOKEN_SECRET as string,
      { clockTolerance: 5 } // Optional buffer
    ) as JwtDecodedPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Unauthorized: Token expired", 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Unauthorized: Invalid token", 401);
    } else {
      throw error;
    }
  }

  // ✅ Verify user
  const user = await UserModel.findById(decoded.id).select("role _id");
  if (!user) throw new AppError("User not found", 404);

  req.user = user;
  next();
});
