import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors";
import { verifyJwt } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: number;
        email: string;
      };
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("authorization");
  if (!header) return next(new UnauthorizedError("Missing Authorization header"));

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return next(new UnauthorizedError("Invalid Authorization header"));

  try {
    const claims = verifyJwt(token);
    const userId = Number(claims.sub);
    if (!Number.isInteger(userId) || userId <= 0) throw new Error("Invalid sub");

    req.auth = { userId, email: claims.email };
    return next();
  } catch {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
}

