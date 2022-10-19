import { Request, Response, NextFunction } from "express";

// Authentication Middleware
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ ERROR: "UNAUTENTICATED" });
  }
}
