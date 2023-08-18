import {createCookie, redirect} from "@remix-run/node";

export let userCookie = createCookie("user", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  maxAge: 60_0000, // 1 hour
  // expires: new Date(Date.now() + 60_0000), // 1 hour
  secure: process.env.NODE_ENV === "production",
});

export async function checkForUserInCookie(cookie: {
  user?: {id: string; email: string};
}) {
  if (cookie?.user) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await userCookie.serialize(cookie),
      },
    });
  }
  return null;
}

export async function readCookie(request: Request) {
  let cookieHeader = request.headers.get("Cookie");
  let cookie = (await userCookie.parse(cookieHeader)) || {};
  return cookie;
}
