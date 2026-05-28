import type { Request, Response } from "express";
import { UserService } from "../services/userService";
import { depositBodySchema } from "../validators/userValidators";
import { UnauthorizedError } from "../utils/errors";

export class UserController {
  constructor(private readonly users: UserService) {}

  getBalance = async (req: Request, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    const result = await this.users.getBalance(userId);
    return res.json({ balance: result.balance });
  };

  deposit = async (req: Request, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    // Accept JSON numbers (recommended). If clients send strings, this will 400.
    const body = depositBodySchema.parse(req.body);

    const result = await this.users.deposit(userId, body.amount);
    return res.json({ message: "Deposit successful", balance: result.balance });
  };
}

