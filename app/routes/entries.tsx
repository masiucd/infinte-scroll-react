import type {LoaderArgs} from "@remix-run/node";
import {
  Form,
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";

import {Dialog} from "~/components/common/dialog";
import Link from "~/components/common/link";
import {PageWrapper} from "~/components/common/page_wrapper";
import {H1} from "~/components/ui/typography";
import {Icons} from "~/lib/icons";
import {getWJSSession} from "~/sessions";
import Button from "~/ui/button";

export async function loader({request}: LoaderArgs) {
  let session = await getWJSSession(request.headers.get("Cookie"));
  let admin = session.get("isAdmin");
  return {isAdmin: admin ? true : false};
}

// Layout route
export default function Page() {
  let {isAdmin} = useLoaderData<typeof loader>();
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();
  let id = searchParams.get("id");
  if (!isAdmin) {
    return (
      <PageWrapper className="py-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="p-2">
            <H1>You are not authorized to view this page.</H1>
            <Link to="/">Go back home</Link>
          </div>
        </div>
      </PageWrapper>
    );
  }
  return (
    <>
      <PageWrapper className="py-10">
        <h1 className="mb-2 text-5xl font-bold">Work journal</h1>
        <p className="mb-4 text-lg text-gray-300">
          Learnings and thoughts about my work as a software developer. Updated
          weekly.
        </p>
        <Outlet />
      </PageWrapper>
      <Dialog open={searchParams.get("open_modal") === "true" && id !== null}>
        <Dialog.Header>
          <p className="text-lg font-bold tracking-tighter">Delete entry</p>
          <button
            className="rounded-full p-1 hover:bg-gray-300"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icons.X />
          </button>
        </Dialog.Header>
        <Dialog.Body>
          <p>Are you sure you want to delete this entry?</p>
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
