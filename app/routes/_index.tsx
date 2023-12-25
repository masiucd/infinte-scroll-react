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
    <>
      <TitleWithWrapper>
        <Link
          className="text-gray-400 underline hover:text-primary-400"
          to="/entries/list"
        >
          Work log
        </Link>
      </TitleWithWrapper>
    </>
  );
}
