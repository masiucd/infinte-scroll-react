import {type ActionArgs, type LoaderArgs, redirect} from "@remix-run/node";
import {Form} from "@remix-run/react";

import {PageWrapper} from "~/components/common/page_wrapper";
import {commitWJSSession, getWJSSession} from "~/sessions";

export async function action({request}: ActionArgs) {
  let form = await request.formData();
  let {email, password} = Object.fromEntries(form.entries());
  if (email === "ciszekmarcell@gmail.com" && password === "123456") {
    let session = await getWJSSession();
    session.set("isAdmin", true);
    return new Response("", {
      headers: {"Set-Cookie": await commitWJSSession(session)},
    });
  }
  return null;
}

export async function loader({request}: LoaderArgs) {
  let session = await getWJSSession(request.headers.get("Cookie"));
  let admin = session.get("isAdmin");
  if (admin) {
    return redirect("/");
  }
  return null;
}

export default function Login() {
  return (
    <PageWrapper>
      <Form method="post">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="text-gray-950"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="text-gray-950"
        />
        <button type="submit">Login</button>
      </Form>
    </PageWrapper>
  );
}
