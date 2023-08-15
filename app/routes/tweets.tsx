import {Outlet} from "@remix-run/react";

export default function Page() {
  return (
    <>
      <div className="bg-red-400 p-10">
        <h1>Layout route</h1>
        <p>Parent</p>
      </div>
      <Outlet />
    </>
  );
}
