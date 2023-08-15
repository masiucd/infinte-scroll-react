import {
  Form,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import {useEffect} from "react";

import {PageWrapper} from "~/components/common/page_wrapper";

export default function Page() {
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();
  let {pathname} = useLocation();

  useEffect(() => {
    if (pathname === "/entries") {
      navigate("/entries/list");
    }
  }, [navigate, pathname]);

  let id = searchParams.get("id");
  return (
    <>
      <PageWrapper>
        <h1 className="mb-2 text-5xl font-bold">Work journal</h1>
        <p className="mb-4 text-lg text-gray-300">
          Learnings and thoughts about my work as a software developer. Updated
          weekly.
        </p>
        <Outlet />
      </PageWrapper>
      {searchParams.get("open_modal") === "true" && id !== null && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 ">
          <section className="bg-white p-2 text-gray-900">
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              Close
            </button>
            <p>Modal component</p>
            <Form method="post" action={`/entries/${id}/edit`}>
              <button
                name="_action"
                value="delete"
                className="w-44 truncate  px-2 py-1 font-bold underline opacity-70 hover:opacity-100"
                type="submit"
              >
                Delete
              </button>
            </Form>
          </section>
        </div>
      )}
    </>
  );
}
