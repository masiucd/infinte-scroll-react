// import {cssBundleHref} from "@remix-run/css-bundle";
import type {LinksFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

import {PageWrapper} from "./components/common/page_wrapper";
import {cn} from "./lib/styles";

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: stylesheet},
];

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
        <PageWrapper className="pt-10">
          <h1 className="mb-2 text-5xl font-bold">Work journal</h1>
          <p className="mb-4 text-lg text-gray-300">
            Learnings and thoughts about my work as a software developer.
            Updated weekly.
          </p>
          <Outlet />
        </PageWrapper>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
