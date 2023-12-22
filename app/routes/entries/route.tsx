import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { PageTitle } from "~/components/page-title";

export async function loader({ request }: LoaderFunctionArgs) {
  if (request.url.split("/").at(-1) === "entries") {
    return redirect("/entries/list", {
      status: 302,
      headers: {
        Location: "/entries/list",
      },
    });
  }
  return null;
}

function EntriesPage() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col">
      <article className="my-10 flex flex-col gap-1 p-1 text-left">
        <PageTitle />
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
