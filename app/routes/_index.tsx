import {Link} from "@remix-run/react";

import {PageWrapper} from "~/components/common/page_wrapper";

const AppRoutes = Object.freeze([
  {
    title: "Entries",
    to: "/entries/list",
  },
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Contact",
    to: "/contact",
  },
]);

export default function Page() {
  return (
    <PageWrapper>
      <h1>My working journal</h1>
      <ul className="flex gap-2">
        {AppRoutes.map((r) => (
          <li key={r.title}>
            <Link to={r.to}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
}
