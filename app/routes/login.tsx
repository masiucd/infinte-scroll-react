import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { commitSession, getSession } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let { email, password } = Object.fromEntries(formData);
  if (typeof email !== "string" && typeof password !== "string") {
    throw new Response("Invalid email or password", {
      status: 401,
    });
  }
  if (email === "masiu@ex.com" && password === "123456") {
    let session = await getSession();
    session.set("admin", true);
    return new Response("", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  return session.data;
}

export default function LoginPage() {
  let data = useLoaderData<typeof loader>();
  console.log("data", data);
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center">
      {data?.admin && <div className="text-2xl">You are logged in</div>}
      <div>
        <Form method="post" className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="rounded-md border border-gray-300 p-2 text-gray-700"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="rounded-md border border-gray-300 p-2 text-gray-700"
          />
          <button
            className="rounded-md border border-gray-300 p-2 text-gray-100"
            type="submit"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
