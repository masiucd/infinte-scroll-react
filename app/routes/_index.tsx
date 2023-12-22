import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { icons } from "~/components/icons";
import { PageTitle } from "~/components/page-title";

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
      <aside className="mb-5 flex flex-col gap-1 px-2">
        <PageTitle />
        <Link
          className="text-gray-500 underline hover:text-primary-400"
          to="/entries/list"
        >
          View work log
        </Link>
      </aside>
      <section className="flex flex-col gap-1 px-2">
        <p>
          Here where I journal my progress as a developer. I write about what I
          learn, what I build, and what I find interesting.
        </p>
        <p>This project is built with tools like </p>
        <ul>
          <li>
            <a
              href="https://remix.run"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-1">
                <icons.Radio size={18} className="text-primary-500" />
                <span>Remix</span>
              </span>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://tailwindcss.com"
            >
              <span className="flex items-center gap-1">
                <icons.Waves size={18} className="text-primary-500" />
                <span>Tailwind</span>
              </span>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.typescriptlang.org"
            >
              <span className="flex items-center gap-1">
                <icons.Type size={18} className="text-primary-500" />
                <span>TypeScript</span>
              </span>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://react.dev/ "
            >
              <span className="flex items-center gap-1">
                <icons.Atom size={18} className="text-primary-500" />
                <span>React</span>
              </span>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
