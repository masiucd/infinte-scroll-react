import { db } from "../db.server";

export async function findUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      admin: true,
    },
  });
}
