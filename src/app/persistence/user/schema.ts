import "server-only";

import {z} from "zod";

export let UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  admin: z.boolean(),
  created_at: z.date().or(z.string()),
});

// let ReadUserSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   email: z.string(),
//   admin: z.boolean(),
//   created_at: z.date().or(z.string()),
// });

export type User = z.infer<typeof UserSchema>;
// export type ReadUser = z.infer<typeof ReadUserSchema>;
