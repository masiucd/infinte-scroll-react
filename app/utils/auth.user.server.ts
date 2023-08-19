import { json, redirect} from "@remix-run/node";

import { userCookie } from "~/lib/cookies.server";

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

export async function checkIfUserIsLoggedIn(request: Request) {
  let cookie = await readCookie(request);
  return cookie?.user ? true : false;
}

export async function checkIfUserIsLoggedInAndRedirect(request: Request) {
  let cookie = await readCookie(request);
  if (cookie?.user) {
    return json(
      {loggedIn: true},
      {
        status: 301,
        statusText: "already logged in",
        headers: {
          Location: "/",
        },
      }
    );
  }
  return json(
    {loggedIn: false},
    {
      status: 200,
      statusText: "ok",
      headers: {
        Location: "/",
      },
    }
  );
}

export async function logout(request: Request) {
  let cookie = await readCookie(request);
  if (cookie?.user) {
    return json(
      {loggedIn: false},
      {
        status: 301,
        statusText: "logged out",
        headers: {
          "Set-Cookie": await userCookie.serialize({}),
          Location: "/",
        },
      }
    );
  }
  return json(
    {loggedIn: false},
    {
      status: 200,
      statusText: "ok",
      headers: {
        Location: "/",
      },
    }
  );
}
