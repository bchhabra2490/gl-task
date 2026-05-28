import type { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { loginBodySchema } from "../validators/authValidators";
import { signJwt } from "../utils/jwt";

export class AuthController {
  constructor(private readonly auth: AuthService) {}

  login = async (req: Request, res: Response) => {
    const body = loginBodySchema.parse(req.body);
    const result = await this.auth.login(body.email, body.pin);
    const token = signJwt({ sub: String(result.userId), email: body.email });
    return res.json({ message: "Login successful", userId: result.userId, token });
  };
}

