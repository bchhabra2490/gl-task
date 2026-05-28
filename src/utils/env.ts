import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().int().positive().default(3000),
  LOG_FORMAT: z.string().optional(),

  JWT_PRIVATE_KEY_PATH: z.string().min(1),
  JWT_PUBLIC_KEY_PATH: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1).default("1h")
});

export const env = envSchema.parse(process.env);

