import {type ActionArgs, type LoaderArgs, redirect} from "@remix-run/node";
import {Form} from "@remix-run/react";
import invariant from "tiny-invariant";

import {PageWrapper} from "~/components/common/page_wrapper";
import {H1} from "~/components/ui/typography";
import {destroyWJSSession, getWJSSession} from "~/sessions";
import Button from "~/ui/button";

export async function loader({request}: LoaderArgs) {
  let session = await getWJSSession(request.headers.get("Cookie"));
  let admin = session.get("isAdmin");
  if (!admin) {
    return redirect("/");
  }
  return null;
}

export async function action({request}: ActionArgs) {
  let form = await request.formData();
  let logout = form.get("logout");
  invariant(logout !== null, "logout should not be null");
  invariant(typeof logout === "string", "logout should be a string");
  if (logout === "yes") {
    let session = await getWJSSession(request.headers.get("Cookie"));
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroyWJSSession(session),
      },
    });
  }
  return redirect("/");
}

export default function Logout() {
  return (
    <PageWrapper>
      <section className="flex flex-col gap-2  pt-10">
        <H1>Logout</H1>
        <p>Are you sure you want to logout?</p>
        <Form method="post">
          <div className="flex gap-2">
            <Button variant="primary" name="logout" value="yes" type="submit">
              Logout
            </Button>
            <Button name="logout" value="no" type="submit">
              Cancel
            </Button>
          </div>
        </Form>
      </section>
    </PageWrapper>
  );
}
