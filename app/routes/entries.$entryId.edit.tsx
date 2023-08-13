import {
  type ActionArgs,
  json,
  type LoaderArgs,
  redirect,
} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {parseISO} from "date-fns";
import invariant from "tiny-invariant";

import {EntryForm} from "~/components/entry_form";
import {db} from "~/utils/prisma.server";
import {sleep} from "~/utils/sleep";

export async function loader({params}: LoaderArgs) {
  let {entryId} = params;
  if (!entryId || typeof entryId !== "string") {
    throw new Response("Non found", {status: 404});
  }
  let entry = await db.entry.findUnique({
    where: {
      id: parseInt(entryId, 10),
    },
  });
  if (entry === null) {
    throw new Response("Not found", {status: 404});
  }
  return {
    ...entry,
    date: entry.date.toISOString().substring(0, 10),
  };
}

export async function action({request}: ActionArgs) {
  let body = await request.formData();
  let id = body.get("id");
  let date = body.get("date");
  let type = body.get("type");
  let text = body.get("text");

  if (!date || !type || !text || !id) {
    return json(
      {
        error: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }

  invariant(typeof text === "string");
  invariant(typeof type === "string");
  invariant(typeof date === "string");
  invariant(typeof id === "string");

  // simulate a slow request
  await sleep();
  await db.entry.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      text,
      type,
      date: parseISO(date),
    },
  });
  return redirect("/");
}

export default function Page() {
  let entry = useLoaderData<typeof loader>();
  return (
    <div className="mb-5 max-w-xl">
      <EntryForm entry={entry} />
    </div>
  );
}
