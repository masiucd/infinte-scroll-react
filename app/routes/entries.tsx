import { Link, Outlet, useLocation } from "@remix-run/react";
import { cn } from "~/utils/cn";

function EntriesPage() {
  let location = useLocation();
  console.log("location", location.pathname);
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col border">
      <article className="my-10 flex flex-col gap-5 px-10">
        <h1>My working journal</h1>
        <p>
          Here where I journal my progress as a developer. I write about what I
          did, what I learned, and what I found interesting.
        </p>

        <ul className="flex gap-2">
          <li>
            <Link
              className={cn(
                "rounded-md border border-gray-400 px-2 py-1",
                location.pathname === "/entries" &&
                  "border-gray-100 bg-gray-400 text-gray-900",
              )}
              to="/entries"
            >
              Entries
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "rounded-md border border-gray-400 px-2 py-1",
                location.pathname === "/entries/list" &&
                  "border-gray-100 bg-gray-400 text-gray-900",
              )}
              to="/entries/list"
            >
              Entries List
            </Link>
          </li>
        </ul>
      </article>
      <Outlet />
    </main>
  );
}

export default EntriesPage;
