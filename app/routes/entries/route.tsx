import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { icons } from "~/components/icons";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { getSession, destroySession } from "~/session.server";

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
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col">
      <article className="my-10 flex flex-col gap-1 px-10">
        <div className="flex justify-end ">
          {isAdmin ? (
            <Form method="post">
              <button
                value="logout"
                name="_action"
                type="submit"
                className="text-gray-100 underline hover:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <icons.LogIn size={18} />
                  <span>Logout</span>
                </span>
              </button>
            </Form>
          ) : (
            <Link
              to="/login"
              className="text-gray-100 underline hover:opacity-50"
            >
              <span className="flex items-center gap-2">
                <icons.LogIn size={18} />
                <span>Login</span>
              </span>
            </Link>
          )}
        </div>
        <h1 className="bg-gradient-to-t from-primary-500 to-violet-500 bg-clip-text leading-snug text-transparent">
          My working journal
        </h1>
        <p>
          Here where I journal my progress as a developer. I write about what I
          did, what I learned, and what I found interesting.
        </p>
      </article>
      <Outlet />
    </main>
  );
}

export default EntriesPage;
