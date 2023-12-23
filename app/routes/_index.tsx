import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { TitleWithWrapper } from "~/components/page-title";

export const meta: MetaFunction = () => [
  { title: "My working journal" },
  {
    name: "description",
    content: "Here where I journal my progress as a developer",
  },
];

export default function Index() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col">
      <TitleWithWrapper>
        <Link
          className="text-gray-400 underline hover:text-primary-400"
          to="/entries/list"
        >
          View work log
        </Link>
      </TitleWithWrapper>
      <section className="relative mx-auto flex w-full max-w-80 flex-1 flex-col sm:max-w-full">
        <strong className="absolute right-2 text-4xl text-gray-300/45">
          Learnings
        </strong>
        <strong className="absolute right-2 top-[270px] rotate-3 text-5xl text-gray-200/25">
          Work Stuff
        </strong>
        <strong className="absolute right-20 top-20 rotate-6 text-4xl text-gray-400/30">
          Intreating Things
        </strong>
        <strong className="absolute left-0 top-44 -rotate-12 text-3xl text-gray-500/30">
          Writing and Reading
        </strong>
      </section>
    </main>
  );
}
