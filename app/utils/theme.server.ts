import { createCookie } from "@remix-run/node";

export let themeStorage = createCookie("user-perfs", {
  maxAge: 1000 * 60 * 60 * 24 * 365 * 100, // 100 years
});
