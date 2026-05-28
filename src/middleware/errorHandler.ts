import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/errors";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.issues.map((i) => ({ path: i.path.join("."), message: i.message }))
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Avoid leaking internal details in production-style APIs.
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
}

