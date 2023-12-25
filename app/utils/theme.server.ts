import { createCookie, createCookieSessionStorage } from "@remix-run/node";

// export let themeStorage = createCookieSessionStorage({
//   cookie: {
//     name: "__theme",
//     secure: process.env.NODE_ENV === "production",
//     httpOnly: true,
//     secrets: ["secret"],
//     sameSite: "lax",
//     path: "/",
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 100), // 100 years
//   },
// });

// export async function getThemeSession(request: Request) {
//   let session = await themeStorage.getSession(request.headers.get("Cookie"));
//   return {
//     get theme() {
//       return session.get("theme");
//     },
//     set theme(value) {
//       session.set("theme", value);
//     },
//     commit() {
//       return themeStorage.commitSession(session);
//     },
//   };
// }

export let themeStorage = createCookie("user-perfs", {
  maxAge: 1000 * 60 * 60 * 24 * 365 * 100, // 100 years
});
