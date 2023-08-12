import type {LoaderArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

import * as entryManager from "~/biz/entry/entry_manager.server";

export async function loader({params}: LoaderArgs) {
  let {entryId} = params;
  if (!entryId || typeof entryId !== "string") return null;
  return await entryManager.getEntryById(Number(entryId));
}

export default function Page() {
  const entry = useLoaderData<typeof loader>();
  if (!entry) return <p>No entry found</p>;
  return (
    <p>
      <p>{entry.text}</p>
      <p>{entry.type}</p>
    </p>
  );
}
