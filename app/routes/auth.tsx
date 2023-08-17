import {Outlet} from "@remix-run/react";

import {PageWrapper} from "~/components/common/page_wrapper";

// Layout route
export default function Page() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
