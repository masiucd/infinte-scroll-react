import {type ActionArgs, type LoaderArgs, redirect} from "@remix-run/node";
import {Form} from "@remix-run/react";

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
  let session = await getWJSSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroyWJSSession(session),
    },
  });
}

export default function Logout() {
  return (
    <PageWrapper>
      <H1>Logout</H1>
      <p>Are you sure you want to logout?</p>
      <Form method="post">
        <Button type="submit">Logout</Button>
      </Form>
    </PageWrapper>
  );
}
