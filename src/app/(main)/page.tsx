import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import LoginForm from "@/components/login-form";
import {generateAuthCookie} from "@/utils/cookie";
import {comparePassword} from "@/utils/password";

import {getUserByEmail} from "../persistence/user/queries";

async function login(formdata: FormData) {
  "use server";
  let email = formdata.get("email");
  let password = formdata.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return {
      status: 400,
      body: {
        message: "bad request",
      },
    };
  }
  let user = await getUserByEmail(email as string);
  if (!user) {
    return {
      status: 404,
      body: {
        message: "user not found",
      },
    };
  }
  let comapred = await comparePassword(password, user.password);
  if (!comapred) {
    return {
      status: 401,
      body: {
        message: "wrong password",
      },
    };
  }
  generateAuthCookie(user);
  redirect("/dashboard");
}

export default async function Home() {
  let c = cookies();
  if (c.has("auth")) {
    redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen items-center">
      <div className="mx-auto w-[20rem]">
        <LoginForm onSubmit={login} />
      </div>
    </main>
  );
}
