import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => [
  { title: "My working journal" },
  {
    name: "description",
    content: "Here where I journal my progress as a developer",
  },
];

export default function Index() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col ">
      <h1>My working journal</h1>
      <ul>
        <li>
          <Link to="/entries/list">Entries</Link>
        </li>
      </ul>
      <p>
        Here where I journal my progress as a developer. I write about what I
        learn, what I build, and what I find interesting.
      </p>
    </main>
  );
}
