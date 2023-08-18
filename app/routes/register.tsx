import {type ActionArgs, json, type LoaderArgs} from "@remix-run/node";
import invariant from "tiny-invariant";

import {AuthForm} from "~/components/auth_form";
import {PageWrapper} from "~/components/common/page_wrapper";
import {checkIfUserIsLoggedInAndRedirect} from "~/lib/cookies.server";
import {hashPassword} from "~/lib/password.server";
import {db} from "~/utils/prisma.server";

export async function action({request}: ActionArgs) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let name = formData.get("name");
  invariant(typeof email === "string", "email must be a string");
  invariant(typeof password === "string", "password must be a string");
  invariant(typeof name === "string", "name must be a string");

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
      name,
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
  return (
    <PageWrapper>
      <AuthForm title="Register">
        <AuthForm.FormGroup label="email">
          <AuthForm.Input label="email" type="email" />
        </AuthForm.FormGroup>
        <AuthForm.FormGroup label="name">
          <AuthForm.Input label="name" type="text" />
        </AuthForm.FormGroup>
        <AuthForm.FormGroup label="password">
          <AuthForm.Input label="password" />
        </AuthForm.FormGroup>
        <div className="flex w-32 flex-col gap-1">
          <AuthForm.SubmitButton>
            <span>Register</span>
          </AuthForm.SubmitButton>
        </div>
      </AuthForm>
    </PageWrapper>
  );
}
