// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // If no token, return Unauthorized

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid or expired, return Forbidden

    req.user = user; // Attach the user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};
