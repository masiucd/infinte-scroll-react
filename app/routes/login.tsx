import {type ActionArgs, type LoaderArgs, redirect} from "@remix-run/node";
import invariant from "tiny-invariant";

import {AuthForm} from "~/components/auth_form";
import {PageWrapper} from "~/components/common/page_wrapper";
import {
  checkIfUserIsLoggedInAndRedirect,
  readCookie,
  userCookie,
} from "~/lib/cookies.server";
import {verifyPassword} from "~/lib/password.server";
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
  return await checkIfUserIsLoggedInAndRedirect(request);
}

export default function Page() {
  return (
    <PageWrapper className="flex-1 justify-center ">
      <AuthForm title="Login">
        <AuthForm.FormGroup label="email">
          <AuthForm.Input label="email" type="email" />
        </AuthForm.FormGroup>
        <AuthForm.FormGroup label="password">
          <AuthForm.Input label="password" />
        </AuthForm.FormGroup>
        <div className="flex w-32 flex-col gap-1">
          <AuthForm.SubmitButton>
            <span>Login</span>
          </AuthForm.SubmitButton>
        </div>
      </AuthForm>
    </PageWrapper>
  );
}
