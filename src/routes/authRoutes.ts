import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthController } from "../controllers/authController";

export function authRoutes(controller: AuthController) {
  const router = Router();

  router.post("/login", asyncHandler(controller.login));

  return router;
}

