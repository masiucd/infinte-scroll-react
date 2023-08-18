export const AppRoutes = Object.freeze([
  {
    title: "Entries",
    to: "/entries",
  },
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Contact",
    to: "/contact",
  },
  {
    title: "Register",
    to: "/register",
  },
  {
    title: "Login",
    to: "/login",
  },
]);

export type AppRouteType = (typeof AppRoutes)[number];
