import type {LoaderArgs} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";

import {PageWrapper} from "~/components/common/page_wrapper";
import {checkIfUserIsLoggedIn} from "~/lib/cookies.server";

const AppRoutes = Object.freeze([
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

export async function loader({request}: LoaderArgs) {
  let loggedIn = await checkIfUserIsLoggedIn(request);
  if (loggedIn) {
    let appRoutes = AppRoutes.filter(
      (route) => route.title !== "Login" && route.title !== "Register"
    );
    return [...appRoutes, {title: "Logout", to: "/logout"}];
  }
  return AppRoutes;
}

export default function Page() {
  let loaderData = useLoaderData<typeof loader>();
  return (
    <PageWrapper>
      <h1>My working journal</h1>
      <ul className="flex flex-col gap-2 ">
        {loaderData.map((r) => (
          <li key={r.title}>
            <Link to={r.to}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}
