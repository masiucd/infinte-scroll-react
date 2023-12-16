// import {cssBundleHref} from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-950 text-gray-50">
        <header className="min-h-[5rem]">
          <div className="mx-auto flex max-w-5xl justify-between px-2 py-5">
            <Link
              to="/"
              className="transition-opacity duration-75 hover:opacity-60"
            >
              <strong className="text-2xl tracking-tight ">
                M<span className="text-primary-500">W</span>J
              </strong>
            </Link>
            <nav className="flex">
              <ul className="flex flex-1 items-center justify-end gap-2 px-2">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/entries/list">Entries</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
