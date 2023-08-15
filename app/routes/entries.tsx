import {Outlet} from "@remix-run/react";

import {PageWrapper} from "~/components/common/page_wrapper";

export default function Page() {
  return (
    <PageWrapper>
      <h1 className="mb-2 text-5xl font-bold">Work journal</h1>
      <p className="mb-4 text-lg text-gray-300">
        Learnings and thoughts about my work as a software developer. Updated
        weekly.
      </p>
      <Outlet />
    </PageWrapper>
  );
}
