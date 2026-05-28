"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const alicePinHash = await bcrypt_1.default.hash("1234", 10);
    const bobPinHash = await bcrypt_1.default.hash("5678", 10);
    await prisma.user.upsert({
        where: { email: "alice@example.com" },
        update: {},
        create: {
            name: "Alice",
            email: "alice@example.com",
            pinHash: alicePinHash,
            balance: 1000
        }
    });
    await prisma.user.upsert({
        where: { email: "bob@example.com" },
        update: {},
        create: {
            name: "Bob",
            email: "bob@example.com",
            pinHash: bobPinHash,
            balance: 500
        }
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
