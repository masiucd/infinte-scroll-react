import {
  Form,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect} from "react";

import {Dialog} from "~/components/common/dialog";
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
      <Dialog open={searchParams.get("open_modal") === "true" && id !== null}>
        <Dialog.Header>
          <p>Modal component</p>
        </Dialog.Header>
        <Dialog.Body>
          <p>Are you sure you want to delete this entry? This action cannot</p>
        </Dialog.Body>
        <Dialog.Footer>
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
        </Dialog.Footer>
      </Dialog>
    </>
  );
}
