import {type ActionArgs, redirect} from "@remix-run/node";
import {Form} from "@remix-run/react";
// import {hash} from "bcrypt";
import invariant from "tiny-invariant";

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

  // let errors: {
  //   password?: string;
  //   confirmPassword?: string;
  //   fullName?: string;
  // } = {};

  let user = await db.user.findUnique({where: {email}});
  console.log("user", user);
  if (user) {
    return redirect("/auth/register", {
      status: 400,
      statusText: "User already exists",
    });
  }

  let hashedPassword = await hashPassword(password);

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name: fullName,
    },
  });
  return redirect("/", {
    status: 201,
    statusText: "User created",
  });
}

// TOOD chceck if user is already logged in
// export async function loader() {
//   return {message: "Register"};
// }

export default function Page() {
  return (
    <div>
      <fieldset>
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
    </div>
  );
}
