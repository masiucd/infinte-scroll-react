import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";
import { FormGroup, Input, Label } from "./form-parts";
import { cn } from "~/utils/cn";

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let { email, password } = Object.fromEntries(formData);
  if (typeof email !== "string" && typeof password !== "string") {
    throw new Response("Invalid email or password", {
      status: 401,
    });
  }
  if (email === "masiu@ex.com" && password === "123") {
    let session = await getSession();
    session.set("admin", true);
    return redirect("/entries/list", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  return {
    errors: {
      message: "Invalid email or password",
    },
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  console.log("session", session.get("admin"));
  if (session.get("admin")) {
    return redirect("/entries/list", {
      status: 302,
      headers: {
        Location: "/entries/list",
      },
    });
  }
  return session.data;
}

export default function LoginPage() {
  let data = useActionData<typeof action>();
  let errorMessage = data?.errors?.message;

  return (
    <main className="flex min-h-[100dvh] flex-col items-center">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col  justify-center">
        <h1 className="mb-2 underline decoration-primary-500">Welcome back!</h1>
        <Form
          method="post"
          className="flex w-full flex-col  gap-5 rounded-md bg-gray-50 p-5"
        >
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              className={cn(errorMessage && "border-red-500")}
            />
            <Label htmlFor="email">Email</Label>
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={cn(errorMessage && "border-red-500")}
            />
            <Label htmlFor="password">Password</Label>
          </FormGroup>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <small className="text-gray-950">
                Forget password?{" "}
                <Link to="/reset-password" className="text-primary-500">
                  Reset
                </Link>
              </small>
              {errorMessage && (
                <small className="text-red-500">{errorMessage}</small>
              )}
            </div>
            <button
              className="rounded-md border border-gray-300 bg-gray-800 p-2 text-gray-100 transition-opacity duration-100 hover:opacity-50"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
}
