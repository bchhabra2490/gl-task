import { PrismaClient } from "@prisma/client";
import { generatePinSalt, hashPin } from "../src/utils/pin";

const prisma = new PrismaClient();

async function main() {
  const alicePinSalt = generatePinSalt();
  const bobPinSalt = generatePinSalt();

  const alicePinHash = await hashPin("1234", alicePinSalt);
  const bobPinHash = await hashPin("5678", bobPinSalt);

  await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: ({
      name: "Alice",
      email: "alice@example.com",
      pinSalt: alicePinSalt,
      pinHash: alicePinHash,
      balance: 100000
    } as any)
  });

  await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: ({
      name: "Bob",
      email: "bob@example.com",
      pinSalt: bobPinSalt,
      pinHash: bobPinHash,
      balance: 50000
    } as any)
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

