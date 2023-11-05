import {z} from "zod";

import sql from "@/db/db";

let UserSchema = z.object({
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

export async function getUserById(id: number): Promise<User | null> {
  let rows = await sql`
    SELECT 
        u.id,
        u.name,
        u.email,
        u.password,
        u.admin,
        u.created_at 
    FROM 
        users u 
    WHERE 
        u.id = ${id}
`;
  let user = UserSchema.parse(rows[0]);
  if (!user) {
    return null;
  }
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  let rows = await sql`
    SELECT 
        u.id,
        u.name,
        u.email,
        u.password,
        u.admin,
        u.created_at 
    FROM 
        users u 
    WHERE 
        u.email = ${email}
`;
  let user = UserSchema.parse(rows[0]);
  if (!user) {
    return null;
  }
  return user;
}
