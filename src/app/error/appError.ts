export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Set error name to class name (helps identify error type)
    this.name = this.constructor.name;

    // Captures stack trace excluding constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}
