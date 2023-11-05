import "server-only";

import sql from "@/db/db";

import {User, UserSchema} from "./schema";

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
  let user = rows[0];
  if (!user) {
    return null;
  }
  return UserSchema.parse(user);
}
