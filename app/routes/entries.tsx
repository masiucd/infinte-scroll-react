import {
  Form,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect} from "react";

import {PageWrapper} from "~/components/common/page_wrapper";
import {Icons} from "~/lib/icons";
import Button from "~/ui/button";

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
      <AnimatePresence>
        {searchParams.get("open_modal") === "true" && id !== null && (
          <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 ">
            <motion.section
              initial={{opacity: 0, scale: 0.5}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.5, transition: {duration: 0.1}}}
              transition={{duration: 0.2}}
              role="dialog"
              className="flex min-h-[12rem] min-w-[22rem] flex-col rounded-md border-4 border-red-400 bg-white p-1 text-gray-900"
            >
              <div className="flex justify-between bg-green-300">
                <p>Modal component</p>
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <Icons.X className="h-6 w-6 text-gray-900 transition-colors duration-200 hover:text-gray-500" />
                </button>
              </div>

              <div className="flex flex-1 items-center border-4 border-red-300">
                <p>
                  Are you sure you want to delete this entry? This action cannot
                </p>
              </div>

              <div className="flex justify-end gap-2 border px-4">
                <Form method="post" action={`/entries/${id}/edit`}>
                  <Button
                    name="_action"
                    value="delete"
                    type="submit"
                    variant="primary"
                  >
                    Delete
                  </Button>
                </Form>
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
