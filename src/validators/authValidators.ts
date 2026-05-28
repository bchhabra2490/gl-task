import { z } from "zod";

export const loginBodySchema = z.object({
  email: z.string().email(),
  pin: z.string().min(1)
});

export type LoginBody = z.infer<typeof loginBodySchema>;

