import "server-only";

import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
