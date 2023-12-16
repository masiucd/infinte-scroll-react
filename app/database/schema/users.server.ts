import { z } from "zod";

export let userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  admin: z.boolean(),
});

export type UserType = z.infer<typeof userSchema>;
