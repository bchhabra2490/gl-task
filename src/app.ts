import express from "express";
import { env } from "./utils/env";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { UserRepository } from "./repositories/userRepository";
import { AuthService } from "./services/authService";
import { UserService } from "./services/userService";
import { AuthController } from "./controllers/authController";
import { UserController } from "./controllers/userController";
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(requestLogger(env.LOG_FORMAT));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  // Wiring (simple manual DI).
  const userRepo = new UserRepository();
  const authService = new AuthService(userRepo);
  const userService = new UserService(userRepo);
  const authController = new AuthController(authService);
  const userController = new UserController(userService);

  app.use(authRoutes(authController));
  app.use(userRoutes(userController));

  app.use(errorHandler);

  return app;
}

