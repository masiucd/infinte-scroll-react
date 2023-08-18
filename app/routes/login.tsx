import {
  type ActionArgs,
  json,
  type LoaderArgs,
  redirect,
} from "@remix-run/node";
import {Form, useLoaderData, useNavigate} from "@remix-run/react";
import {useEffect} from "react";
import invariant from "tiny-invariant";

import {PageWrapper} from "~/components/common/page_wrapper";
import {readCookie, userCookie} from "~/lib/cookies.server";
import {verifyPassword} from "~/lib/password.server";
import Button from "~/ui/button";
import {db} from "~/utils/prisma.server";

export async function action({request}: ActionArgs) {
  let cookie = await readCookie(request);
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  invariant(typeof email === "string", "email must be a string");
  invariant(typeof password === "string", "password must be a string");

  let user = await db.user.findUnique({where: {email}});

  if (user) {
    let isValidPassword = await verifyPassword(password, user?.password);
    if (!isValidPassword) {
      return redirect("/login", {
        status: 401,
        statusText: "Unauthorized",
      });
    }
    cookie.user = {id: user.id, email: user.email};
    // cookie.user = JSON.stringify({id: user.id, email: user.email});
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
  let cookie = await readCookie(request);
  if (cookie?.user) {
    return json(
      {loggedIn: true},
      {
        status: 301,
        statusText: "already logged in",
      }
    );
  }
  return json({loggedIn: false}, {status: 200, statusText: "ok"});
}

export default function Page() {
  let loaderData = useLoaderData<typeof loader>();
  let navigate = useNavigate();
  useEffect(() => {
    if (loaderData?.loggedIn) {
      navigate("/", {replace: true});
    }
  }, [loaderData?.loggedIn, navigate]);
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
