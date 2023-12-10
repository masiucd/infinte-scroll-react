import { Outlet } from "@remix-run/react";

function EntriesPage() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col border">
      <article className="my-10">
        <h1>My working journal</h1>
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
