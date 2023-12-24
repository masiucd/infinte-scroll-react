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
  await validateAdmin(request);
  let formData = await request.formData();
  let action = formData.get("_action");
  let session = await getSession(request.headers.get("Cookie"));
  if (action === "logout") {
    return redirect("/entries/list", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }
  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));

  return {
    isAdmin: !!session.data.admin,
  };
}

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
        <Header />
        <main className="mx-auto mb-10 flex min-h-[calc(100dvh-190px)] w-full flex-col px-2 sm:max-w-2xl sm:px-0">
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        <footer className="flex h-20 items-center ">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between border-gray-500 px-2 pb-1 pt-5 md:px-0 lg:border-t">
            <div className="flex gap-3">
              <ul className="flex justify-end  gap-3 text-gray-500">
                <li>
                  <Link
                    to="/about"
                    className="pointer-events-none flex hover:opacity-50"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <span>About</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/entries/list" className="flex hover:opacity-50">
                    <span className="flex items-center gap-2 text-sm">
                      <span>Entries</span>
                    </span>
                  </Link>
                </li>
              </ul>
              <small>
                <span className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Marcell Ciszek Druzynski
                </span>
              </small>
            </div>
            <ul className="flex gap-3">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <a
                  href="https://github.com/masiucd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <a
                  href="https://twitter.com/masiu_cd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <a
                  href="https://www.instagram.com/masiu_cd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}

function Header() {
  let { isAdmin } = useLoaderData<typeof loader>();
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
        <div className="flex justify-end  text-gray-500">
          {isAdmin ? (
            <Form method="post">
              <button
                value="logout"
                name="_action"
                type="submit"
                className="hover:opacity-50"
              >
                <span className="flex items-center gap-2 text-sm ">
                  <span>Logout</span>
                </span>
              </button>
            </Form>
          ) : (
            <Link to="/login" className="flex hover:opacity-50">
              <span className="flex items-center gap-2 text-sm">
                <span>Log in</span>
              </span>
            </Link>
          )}
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
