import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { UserController } from "../controllers/userController";
import { requireAuth } from "../middleware/authMiddleware";

export function userRoutes(controller: UserController) {
  const router = Router();

  router.get("/users/balance", requireAuth, asyncHandler(controller.getBalance));
  router.post("/users/deposit", requireAuth, asyncHandler(controller.deposit));

  return router;
}

