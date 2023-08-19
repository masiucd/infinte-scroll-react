import {createCookieSessionStorage} from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  isAdmin: boolean;
};

type SessionFlashData = {
  error: string;
  success: string;
};

let {
  getSession: getWJSSession,
  commitSession: commitWJSSession,
  destroySession: destroyWJSSession,
} = createCookieSessionStorage<SessionData, SessionFlashData>({
  // a Cookie from `createCookie` or the CookieOptions to create one
  cookie: {
    name: "work-journal-session",
    secrets: ["masiu-cd"],

    sameSite: "lax",
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === "production",
    // domain: "localhost",
  },
});

export {commitWJSSession, destroyWJSSession, getWJSSession};
