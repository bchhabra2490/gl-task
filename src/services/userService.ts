import { NotFoundError } from "../utils/errors";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
  constructor(private readonly users: UserRepository) {}

  async getBalance(userId: number): Promise<{ balance: number }> {
    const balance = await this.users.getBalanceById(userId);
    if (balance === null) throw new NotFoundError("User not found");
    return { balance };
  }

  async deposit(userId: number, amount: number): Promise<{ balance: number }> {
    try {
      const user = await this.users.depositAtomic(userId, amount);
      return { balance: user.balance };
    } catch (e) {
      // Prisma throws if record doesn't exist; keep API response consistent.
      throw new NotFoundError("User not found");
    }
  }
}

