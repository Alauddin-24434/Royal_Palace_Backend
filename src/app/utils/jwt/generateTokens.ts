import jwt from "jsonwebtoken";
import { envVariable } from "../../config";
import { Types } from "mongoose";

interface JwtPayload{
    id:Types.ObjectId;
    role:string;
}

export const createAccessToken = (payload: JwtPayload) => {
 return jwt.sign(payload, envVariable.JWT_ACCESS_TOKEN_SECRET, { expiresIn: envVariable.JWT_ACCESS_TOKEN_EXPIRES_IN });
};

export const createRefreshToken = (payload: JwtPayload) => {
 return jwt.sign(payload, envVariable.JWT_REFRESH_TOKEN_SECRET, { expiresIn: envVariable.JWT_REFRESH_TOKEN_EXPIRES_IN });
};
