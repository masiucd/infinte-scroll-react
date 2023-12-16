import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";

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
  return null;
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
  return (
    <main className="flex min-h-[100dvh] flex-col items-center">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col  justify-center">
        <h1 className="mb-2 underline decoration-primary-500">Welcome back!</h1>
        <Form
          method="post"
          className="flex w-full flex-col  gap-5 rounded-md bg-gray-50 p-5"
        >
          <div className="relative flex flex-col">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              className="peer h-10 w-full border-0 border-b-2 border-gray-300 bg-gray-50 text-gray-700 placeholder:text-transparent focus:border-primary-500  focus:outline-none focus:ring-0"
            />
            <label
              className="absolute 
                -top-3.5
                left-1
                text-gray-950
                transition-all
                peer-placeholder-shown:top-2
                peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
                peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600
              "
              htmlFor="email"
            >
              Email address
            </label>
          </div>
          <div className="relative flex flex-col">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="peer h-10 w-full  border-0 border-b-2 border-gray-300 bg-gray-50 text-gray-700 placeholder:text-transparent focus:border-primary-500  focus:outline-none focus:ring-0"
            />
            <label
              className="absolute 
              -top-3.5
              left-1
              text-gray-950
              transition-all
              peer-placeholder-shown:top-2
              peer-placeholder-shown:text-base
            peer-placeholder-shown:text-gray-400
              peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600
            "
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="flex items-center justify-between">
            <small className="text-gray-950">
              Forget password?{" "}
              <Link to="/reset-password" className="text-primary-500">
                Reset
              </Link>
            </small>
            <button
              className="rounded-md border border-gray-300 bg-gray-800 p-2 text-gray-100 hover:opacity-50"
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
