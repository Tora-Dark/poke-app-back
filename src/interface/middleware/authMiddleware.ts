// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "@domain/errors/AuthenticationError";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new AuthenticationError(); // If no token, return Unauthorized

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      throw new AuthenticationError("Invalid or expired token", 403);
    } // If token is invalid or expired, return Forbidden

    req.user = user; // Attach the user information to the request object
    next();
  });
};
