import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

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
      <article className="my-10 flex flex-col gap-1 px-10">
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
