import {Outlet} from "@remix-run/react";

// Layout route
export default function Page() {
  return (
    <div className="bg-red-500">
      <h1>About</h1>
      <Outlet />
    </div>
  );
}
