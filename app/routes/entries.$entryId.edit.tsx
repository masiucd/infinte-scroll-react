import { redirect } from "@remix-run/node";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EntryForm } from "~/components/entry-form";
import { getEntryById, updateEntry } from "~/database/queries/entries.server";
import { updateSchema } from "~/database/schema/entries.server";
import { sleep } from "~/utils/sleep";

export const meta: MetaFunction = () => [
  { title: "My working journal - Edit entry" },
  {
    name: "description",
    content: "Edit entry",
  },
];

export async function action({ request, params }: ActionFunctionArgs) {
  if (typeof params.entryId !== "string") {
    throw new Response("Not found", { status: 404 });
  }
  let formData = await request.formData();
  let date = formData.get("date");
  let type = formData.get("type");
  let text = formData.get("text");
  console.log({ date, type, text });
  if (
    typeof date !== "string" ||
    typeof type !== "string" ||
    typeof text !== "string"
  ) {
    throw new Error("Bad request");
  }
  // TODO to test when connection is slow
  await sleep();
  let entry = updateSchema.parse({
    id: parseInt(params.entryId, 10),
    date: new Date(date),
    type,
    text,
  });
  await updateEntry(entry);
  return redirect(`/`);
}

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
    <section className="flex flex-1 flex-col  border">
      <div className="mb-5 w-full max-w-lg border border-blue-600">
        <h1>Edit entry </h1>

        <div className="my-5">
          <EntryForm entry={entry} />
        </div>
      </div>
    </section>
  );
}
