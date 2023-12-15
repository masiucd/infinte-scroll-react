import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { getSession, destroySession } from "~/session.server";
import { cn } from "~/utils/cn";

export async function action({ request }: ActionFunctionArgs) {
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
  if (request.url.split("/").at(-1) === "entries") {
    return redirect("/entries/list", {
      status: 302,
      headers: {
        Location: "/entries/list",
      },
    });
  }
  let session = await getSession(request.headers.get("Cookie"));
  return {
    isAdmin: !!session.data.admin,
  };
}

function EntriesPage() {
  let { isAdmin } = useLoaderData<typeof loader>();
  let location = useLocation();
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col border">
      {isAdmin && (
        <Form method="post">
          <button value="logout" name="_action" type="submit">
            Logout
          </button>
        </Form>
      )}

      <article className="my-10 flex flex-col gap-5 px-10">
        <h1>My working journal</h1>
        <p>
          Here where I journal my progress as a developer. I write about what I
          did, what I learned, and what I found interesting.
        </p>
        <Link
          to="/entries/list"
          className={cn(
            "text-primary-400",
            location.pathname === "/entries/list" &&
              "pointer-events-none opacity-50",
          )}
        >
          Entries list
        </Link>
      </article>
      <Outlet />
    </main>
  );
}

export default EntriesPage;
