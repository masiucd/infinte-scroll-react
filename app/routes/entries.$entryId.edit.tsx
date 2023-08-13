import type {LoaderArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

import {EntryForm} from "~/components/entry_form";
import {db} from "~/utils/prisma.server";

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

export default function Page() {
  let entry = useLoaderData<typeof loader>();
  return (
    <div className="mb-5 max-w-xl">
      <EntryForm entry={entry} />
    </div>
  );
}
