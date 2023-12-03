import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getEntryById } from "~/database/queries/entries.server";

export async function loader({ params }: LoaderFunctionArgs) {
  let { entryId } = params;
  if (typeof entryId !== "string") {
    throw new Response("Not found", { status: 404 });
  }
  let id = parseInt(entryId, 10);
  let entry = await getEntryById(id);
  if (!entry) {
    throw new Response("Not found", { status: 404 });
  }

  return entry;
}

export default function EditPage() {
  let entry = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Edit entry </h1>
      <p>
        <strong>id:</strong> {entry.id}
      </p>
      <p>{entry.text}</p>
    </div>
  );
}
