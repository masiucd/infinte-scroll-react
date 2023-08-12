import type {LoaderArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {format, parseISO} from "date-fns";

export async function loader({params}: LoaderArgs) {
  // let {entryId} = params;
  // if (!entryId || typeof entryId !== "string") {
  //   throw new Response("Non found", {status: 404});
  // }
  // const entry = await entryManager.getEntryById(Number(entryId));
  // if (entry === null) {
  //   throw new Response("Not found", {status: 404});
  // }
  // return {
  //   ...entry,
  //   date: entry.createdAt.toISOString().substring(0, 10),
  // };
  return {};
}

export default function Page() {
  const entry = useLoaderData<typeof loader>();

  return (
    <p>
      {/* <p>{entry.text}</p>
      <p>{entry.type}</p>
      <p>{format(parseISO(entry.createdAt), "yyyy-MM-dd")}</p> */}
    </p>
  );
}
