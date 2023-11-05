import "server-only";

import {sign} from "jsonwebtoken";
import {cookies} from "next/headers";

import {User} from "@/app/persistence/user/schema";

export function generateAuthCookie({id, email, admin}: User) {
  let token = sign({id, email, admin}, process.env.JWT_SECRET ?? "", {
    expiresIn: "1h",
  });
  let cookieStore = cookies();
  cookieStore.set("auth", token, {
    secure: true,
    expires: new Date(Date.now() + 3600000), // 1 hour
    // httpOnly: true,
  });
}

export function destroyCookie(key: string) {
  let cookieStore = cookies();
  cookieStore.delete(key);
}
