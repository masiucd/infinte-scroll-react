import { createCookieSessionStorage } from "@remix-run/node";

export let { commitSession, getSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "mjs",
      secrets: ["secret"],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  });
