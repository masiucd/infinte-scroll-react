import { createCookieSessionStorage } from "@remix-run/node";

let SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not set");
}

export let { commitSession, getSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "mjs",
      secrets: [SESSION_SECRET],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  });
