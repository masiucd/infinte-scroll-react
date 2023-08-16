import type {ActionArgs, LoaderArgs} from "@remix-run/node";
import {Form, useLoaderData} from "@remix-run/react";

import Button from "~/ui/button";

export async function loader({request}: LoaderArgs) {
  let cookie = request.headers.get("Cookie");
  if (cookie) {
    let count = Number(cookie.split("=")[1]);
    if (count < 0) return 0;
    return count;
  }
  return 0;
}

export async function action({request}: ActionArgs) {
  let data = await request.formData();
  let count = data.get("count");
  return new Response("ok", {
    status: 200,
    headers: {
      "Set-Cookie": `count=${count}; Path=/; HttpOnly; Max-Age=31536000; SameSite=Strict`,
    },
  });
}

// Counter Remix style, using form and cookies
export default function Page() {
  let count = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Counter and count is {count}</h1>
      <Form method="post">
        <div className="flex gap-5">
          <Button
            variant="default"
            name="count"
            value={count - 1}
            type="submit"
            disabled={count === 0}
          >
            Decrement
          </Button>
          <Button
            variant="default"
            name="count"
            value={count + 1}
            type="submit"
          >
            Increment
          </Button>

          <Button variant="default" name="count" value={0} type="submit">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}
