import type { Prisma, User } from "@prisma/client";
import { prisma } from "../utils/prisma";

export class UserRepository {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async getBalanceById(id: number): Promise<number | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { balance: true }
    });
    return user?.balance ?? null;
  }

  depositAtomic(id: number, amount: number): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        balance: { increment: amount } satisfies Prisma.IntFieldUpdateOperationsInput
      }
    });
  }
}

