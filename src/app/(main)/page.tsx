import LoginForm from "@/components/login-form";

import {getUserByEmail} from "../persistence/user/queries";

async function login(formdata: FormData) {
  "use server";
  let email = formdata.get("email");
  let password = formdata.get("password");
  let user = await getUserByEmail(email as string);
  if (!user) {
    return {
      status: 404,
      body: {
        message: "user not found",
      },
    };
  }
  if (user.password !== password) {
    return {
      status: 401,
      body: {
        message: "wrong password",
      },
    };
  }
  return {
    status: 200,
    body: {
      message: "ok",
    },
  };
}

export default async function Home() {
  return (
    <main>
      <LoginForm onSubmit={login} />
    </main>
  );
}
