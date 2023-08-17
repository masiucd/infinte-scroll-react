import {createCookie} from "@remix-run/node";

export let userCookie = createCookie("user", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  maxAge: 60, // 1 minute
  expires: new Date(Date.now() + 60_0000), // 1 hour
  secure: process.env.NODE_ENV === "production",
});
