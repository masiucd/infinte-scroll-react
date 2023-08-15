import type {LinksFunction, V2_MetaFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

import {cn} from "./lib/styles";

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: stylesheet},
];

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

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={cn("bg-gray-950 text-gray-100")}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
