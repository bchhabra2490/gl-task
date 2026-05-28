import { UnauthorizedError } from "../utils/errors";
import { UserRepository } from "../repositories/userRepository";
import { verifyPin } from "../utils/pin";

export class AuthService {
  constructor(private readonly users: UserRepository) {}

  async login(email: string, pin: string): Promise<{ userId: number }> {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid email or PIN");

    // Type assertion keeps this file resilient to stale editor type caches after Prisma generates.
    const salt = (user as unknown as { pinSalt: string }).pinSalt;
    const ok = await verifyPin(pin, salt, user.pinHash);
    if (!ok) throw new UnauthorizedError("Invalid email or PIN");

    return { userId: user.id };
  }
}

