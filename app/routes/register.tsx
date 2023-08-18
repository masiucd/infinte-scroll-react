import {
  type ActionArgs,
  json,
  type LoaderArgs,
  redirect,
} from "@remix-run/node";
import {Form, useActionData, useNavigate} from "@remix-run/react";
import {useEffect} from "react";
import invariant from "tiny-invariant";

import {PageWrapper} from "~/components/common/page_wrapper";
import {
  checkIfUserIsLoggedInAndRedirect,
  readCookie,
} from "~/lib/cookies.server";
import {hashPassword} from "~/lib/password.server";
import Button from "~/ui/button";
import {db} from "~/utils/prisma.server";

export async function action({request}: ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let fullName = formData.get("fullName");
  invariant(typeof email === "string", "email must be a string");
  invariant(typeof password === "string", "password must be a string");
  invariant(typeof fullName === "string", "fullName must be a string");

  let user = await db.user.findUnique({where: {email}});
  if (user) {
    return json(
      {message: "user already exists", status: 400},
      {status: 400, statusText: "Errors"}
    );
  }

  let hashedPassword = await hashPassword(password);
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name: fullName,
    },
  });

  return json(
    {
      message: "User created",
      status: 201,
    },
    {status: 201, statusText: "User created"}
  );
}

export async function loader({request}: LoaderArgs) {
  return await checkIfUserIsLoggedInAndRedirect(request);
}

export default function Page() {
  let actionData = useActionData<typeof action>();
  let navigate = useNavigate();
  console.log("actionData", actionData);
  // useEffect(() => {
  //   if (actionData.) {
  //     navigate("/", {replace: true});
  //   }
  // }, [actionData, navigate]);

  return (
    <PageWrapper>
      <fieldset className="mx-auto w-full max-w-full sm:max-w-lg">
        <legend>Register</legend>
        <Form method="post">
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
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
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
              Register
            </Button>
          </div>
        </Form>
      </fieldset>
    </PageWrapper>
  );
}
