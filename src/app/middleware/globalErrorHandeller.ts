import mongoose from "mongoose";
import multer from "multer";
import { AppError } from "../error/appError";
import { ErrorRequestHandler } from "express";
import { envVariable } from "../config";
import { ZodError } from "zod";
import path from "path";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorName = err.name || "Error";
  let errorSources: { path: string; message: string }[] = [];

  // ✅ Handle custom AppError (your custom operational errors)
  if (err instanceof AppError && err.isOperational) {
    errorSources = [{ path: "", message: err.message }];
  }

  // ✅ Handle Zod validation errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    errorName = "ZodValidationError";
    message = "Validation Error";

    errorSources = err.issues.map((iss) => ({
      path: iss.path.join("."),
      message: iss.message,
    }));
  }

  // ✅ Handle MongoDB duplicate key error (code 11000)
  else if (err.code === 11000) {
    statusCode = 409;
    errorName = "DuplicateKeyError";
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for "${field}": "${err.keyValue[field]}"`;
    errorSources = [{ path: field, message }];
  }

  // ✅ Handle Multer upload errors
  else if (err instanceof multer.MulterError) {
    statusCode = 400;
    errorName = "MulterError";
    message =
      err.code === "LIMIT_FILE_SIZE"
        ? "File size too large. Max 5MB allowed."
        : `Multer error: ${err.message}`;
    errorSources = [{ path: "file", message }];
  }

  // ✅ Handle Mongoose validation error
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    errorName = "MongooseValidationError";
    const errors = Object.values(err.errors).map((e: any) => ({
      path: e.path,
      message: e.message,
    }));
    message = "Validation Error";
    errorSources = errors;
  }

  // ✅ Handle invalid ObjectId, etc.
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    errorName = "CastError";
    message = `Invalid ${err.path}: "${err.value}"`;
    errorSources = [{ path: err.path, message }];
  }

  // ✅ Default unknown errors
  else {
    if (envVariable.NODE_ENV === "production") {
      message = "Internal Server Error";
    }
    errorSources = [{ path: "", message }];
  }

  // ✅ Final unified response
  res.status(statusCode).json({
    success: false,
    statusCode,
    error: errorName,
    message,
    errorSources,
    stack: envVariable.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
