import {type ActionArgs, type LoaderArgs, redirect} from "@remix-run/node";
import {Form, useActionData, useLoaderData} from "@remix-run/react";
import invariant from "tiny-invariant";

import {PageWrapper} from "~/components/common/page_wrapper";
import {userCookie} from "~/cookies.server";
import Button from "~/ui/button";

const EMAIL = "masiu@ex.com";
const PASSWORD = "123";

export async function action({request}: ActionArgs) {
  let cookieHeader = request.headers.get("Cookie");
  let cookie = (await userCookie.parse(cookieHeader)) || {};
  // Cookie can be null if it's not set

  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  invariant(typeof email === "string", "email must be a string");
  invariant(typeof password === "string", "password must be a string");

  if (email === EMAIL && password === PASSWORD) {
    cookie.userEmail = email;
    return redirect("/", {
      headers: {
        "Set-Cookie": await userCookie.serialize(cookie),
      },
    });
  }

  return redirect("/login", {
    status: 401,
    statusText: "Unauthorized",
  });
}

export async function loader({request}: LoaderArgs) {
  let cookieHeader = request.headers.get("Cookie");
  let cookie = await userCookie.parse(cookieHeader);
  // Cookie can be null if it's not set
  console.log("cookie", cookie);
  if (cookie?.userEmail) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await userCookie.serialize(cookie),
      },
    });
  }
  return null;
}

export default function Page() {
  return (
    <PageWrapper className="flex-1 justify-center ">
      <fieldset className="mx-auto my-8 flex w-full max-w-md flex-col items-center justify-center rounded-md border border-gray-300 p-4 shadow-md">
        <legend>Login</legend>
        <Form method="post" className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="rounded-sm text-gray-950"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="rounded-sm text-gray-950"
              required
            />
          </div>
          <div className="flex w-32 flex-col gap-1">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </fieldset>
    </PageWrapper>
  );
}
