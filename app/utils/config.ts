export const AppRoutes = Object.freeze([
  {
    title: "entries",
    to: "/entries",
  },
  {
    title: "about",
    to: "/about",
  },
  {
    title: "login",
    to: "/login",
  },
  {
    title: "logout",
    to: "/logout",
  },
]);

export type AppRouteType = (typeof AppRoutes)[number];
