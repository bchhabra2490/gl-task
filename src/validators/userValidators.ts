import { z } from "zod";

export const depositBodySchema = z.object({
  // Amount is in cents (smallest currency unit)
  amount: z.coerce.number().int().gt(0)
});

export type DepositBody = z.infer<typeof depositBodySchema>;

