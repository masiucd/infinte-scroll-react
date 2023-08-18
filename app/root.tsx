import type {LinksFunction, LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

import Header from "./components/layout/header";
import {checkIfUserIsLoggedIn} from "./lib/cookies.server";
import {cn} from "./lib/styles";
import {AppRoutes} from "./utils/config";

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: stylesheet},
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap",
  },
];

// {/* <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" rel="stylesheet"></link> */}

export const meta: V2_MetaFunction = () => {
  return [
    {
      title:
        "My working journal | Marcell Ciszek Druzynski - Software Developer",
    },
    {
      name: "description",
      content: "My working journal is a place where I write about my work..",
    },
    {
      property: "og:title",
      content: "My working journal",
    },
  ];
};

export async function loader({request}: LoaderArgs) {
  let loggedIn = await checkIfUserIsLoggedIn(request);
  if (loggedIn) {
    let appRoutes = AppRoutes.filter(
      ({title}) => !["Login", "Register"].includes(title)
    );
    return [...appRoutes, {title: "Logout", to: "/logout"}];
  }
  return AppRoutes.filter(({title}) => title !== "Entries");
}

export default function App() {
  let loaderData = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={cn("bg-gray-950 text-gray-100 font-serif")}>
        <Header routes={loaderData} />
        <main className={cn("flex flex-col min-h-screen flex-1")}>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
