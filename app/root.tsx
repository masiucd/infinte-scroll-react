import {
  redirect,
  type LinksFunction,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { destroySession, getSession } from "./session.server";
import { validateAdmin } from "./utils/validate-admin.server";

import { cn } from "./utils/cn";
import { themeStorage } from "./utils/theme.server";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: "/fonts/inter.css",
  },
];

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let action = formData.get("_action");

  if (action === "logout") {
    await validateAdmin(request);
    let session = await getSession(request.headers.get("Cookie"));
    return redirect("/entries/list", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  if (action === "theme") {
    let cookieHeader = request.headers.get("Cookie");
    let cookie = (await themeStorage.parse(cookieHeader)) || {};
    if (!cookie.theme) {
      cookie.theme = "dark";
      return redirect(request.url, {
        headers: {
          "Set-Cookie": await themeStorage.serialize(cookie),
        },
      });
    }
    return redirect(request.url, {
      headers: {
        "Set-Cookie": await themeStorage.serialize({
          theme: cookie.theme === "dark" ? "light" : "dark",
        }),
      },
    });
  }

  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let themeCookie =
    (await themeStorage.parse(request.headers.get("Cookie"))) || {};
  return {
    isAdmin: !!session.data.admin,
    // theme: themeCookie.theme ?? "dark",
    theme: (themeCookie.theme ?? "dark") as "dark" | "light",
  };
}

export default function App() {
  let { theme } = useLoaderData<typeof loader>();
  return (
    <html
      lang="en"
      style={{
        colorScheme: theme,
      }}
      className={cn(theme)}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
        <Header />
        <main className="mx-auto mb-10 flex min-h-[calc(100dvh-200px)] w-full flex-col px-2 sm:max-w-2xl sm:px-0">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="flex h-20 items-center ">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between border-gray-500 px-2 pb-1 pt-5 md:px-0 lg:border-t">
        <ul className="flex items-center justify-end gap-3 text-gray-500">
          <li>
            <Link to="/entries/list" className="flex hover:opacity-50">
              <span className="flex items-center gap-2 text-sm">
                <span>Entries</span>
              </span>
            </Link>
          </li>
          <li>
            <small className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()}{" "}
              <span className="hidden md:inline-block">
                Marcell Ciszek Druzynski
              </span>
              <span className=" md:hidden">M.C.D</span>
            </small>
          </li>
        </ul>
        <ul className="flex gap-3">
          {[
            {
              name: "Github",
              url: "https://github.com/masiucd",
            },
            {
              name: "Twitter",
              url: "https://twitter.com/masiu_cd",
            },
            {
              name: "Instagram",
              url: "https://www.instagram.com/masiu_cd/",
            },
          ].map((link) => (
            <li
              className="flex items-center gap-2 text-sm text-gray-500"
              key={link.url}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function Header() {
  let { isAdmin, theme } = useLoaderData<typeof loader>();
  return (
    <header className="min-h-[5rem]">
      <div className="mx-auto flex max-w-4xl justify-between border-gray-500 px-2 pb-1 pt-5 md:px-0 lg:border-b">
        <Link
          to="/"
          className="transition-opacity duration-75 hover:opacity-60"
        >
          <strong className="text-sm uppercase tracking-tight text-gray-200">
            Marcell<span className="text-gray-400">Ciszek</span>
            <span className="text-gray-500">Druzynski</span>
          </strong>
        </Link>
        <div className="flex items-center justify-end gap-2 text-gray-500">
          {isAdmin ? (
            <Form method="post">
              <button
                value="logout"
                name="_action"
                type="submit"
                className="hover:opacity-50"
              >
                <span className="flex items-center gap-2 text-sm ">Logout</span>
              </button>
            </Form>
          ) : (
            <Link to="/login" className="flex hover:opacity-50">
              <span className="flex items-center gap-2 text-sm">Log in</span>
            </Link>
          )}
          <Form method="post">
            <button
              value="theme"
              name="_action"
              type="submit"
              className="hover:opacity-50"
            >
              <span
                className="flex items-center gap-2 text-sm"
                title="Toggle theme"
              >
                {theme === "dark" ? <span>🌞</span> : <span>🌛</span>}
              </span>
            </button>
          </Form>
        </div>
      </div>
    </header>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-[100dvh] items-center justify-center bg-gray-950 text-gray-50">
        <div className="flex flex-col gap-1">
          <h1 className="text-6xl font-bold tracking-tight underline decoration-primary-500 underline-offset-1">
            Wooops!
          </h1>
          {isRouteErrorResponse(error) ? (
            <p className="text-2xl font-bold tracking-tight">
              {error.status} - {error.statusText}
            </p>
          ) : (
            <p>
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
          )}
          <Link className="text-primary-500 underline hover:opacity-50" to="/">
            Go back home
          </Link>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
