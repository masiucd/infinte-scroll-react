import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { TitleWithWrapper } from "~/components/page-title";

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
      <TitleWithWrapper />
      <Outlet />
    </main>
  );
}

export default EntriesPage;
