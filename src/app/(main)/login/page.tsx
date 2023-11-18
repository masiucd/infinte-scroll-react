import {redirect} from "next/navigation";

import {getUserByEmail} from "@/app/persistence/user/queries";
import LoginForm from "@/components/login-form";
import {LoginErrorResultSchema} from "@/types/login";
import {generateAuthCookie} from "@/utils/cookie";
import {comparePassword} from "@/utils/password";

async function login(formdata: FormData) {
  "use server";
  let email = formdata.get("email");
  let password = formdata.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return LoginErrorResultSchema.parse({
      status: 400,
      body: {
        message: "bad request",
      },
    });
  }
  let user = await getUserByEmail(email as string);
  if (!user) {
    return LoginErrorResultSchema.parse({
      status: 404,
      body: {
        message: "user not found",
      },
    });
  }
  let comapred = await comparePassword(password, user.password);
  if (!comapred) {
    return LoginErrorResultSchema.parse({
      status: 401,
      body: {
        message: "wrong password",
      },
    });
  }
  generateAuthCookie(user);
  redirect("/dashboard");
}

export default function Login() {
  return (
    <div className="w-[20rem]">
      <LoginForm onSubmit={login} />
    </div>
  );
}
