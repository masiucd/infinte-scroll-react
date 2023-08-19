import {type ActionArgs, type LoaderArgs, redirect} from "@remix-run/node";

import {AuthForm} from "~/components/auth_form";
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
      <AuthForm action="/login" title="Login">
        <AuthForm.FormGroup label="email">
          <AuthForm.Input type="email" name="email" label="email" />
        </AuthForm.FormGroup>
        <AuthForm.FormGroup label="password">
          <AuthForm.Input type="password" name="password" label="password" />
        </AuthForm.FormGroup>
        <div className="flex justify-end pt-3">
          <AuthForm.SubmitButton>Login</AuthForm.SubmitButton>
        </div>
      </AuthForm>
    </PageWrapper>
  );
}
