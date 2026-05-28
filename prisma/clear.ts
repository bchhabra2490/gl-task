import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Deletes table rows (useful for local/dev).
 *
 * Usage:
 * - Clear users:  TABLE=users npm run db:clear
 * - Clear all:    TABLE=all   npm run db:clear
 */
async function main() {
  const table = (process.env.TABLE ?? "users").toLowerCase();

  if (table === "users") {
    const result = await prisma.user.deleteMany();
    console.log(`Deleted ${result.count} row(s) from users`);
    return;
  }

  if (table === "all") {
    // Extend this list if you add more models.
    const users = await prisma.user.deleteMany();
    console.log(`Deleted ${users.count} row(s) from users`);
    return;
  }

  throw new Error(`Unknown TABLE="${process.env.TABLE}". Use "users" or "all".`);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

