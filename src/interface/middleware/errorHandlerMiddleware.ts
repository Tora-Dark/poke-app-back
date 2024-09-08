import { Request, Response, NextFunction } from "express";
import { BaseError } from "@domain/errors/BaseError";
import { logger } from "./loggerMiddleware";

const errorHandler = (
  err: Error & Partial<{ statusCode: number }>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message ?? "Internal Server Error", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    stack: err.stack,
  });

  const statusCode = err instanceof BaseError ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export { errorHandler };
