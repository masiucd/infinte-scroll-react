import { redirect } from "@remix-run/node";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { FormEvent } from "react";
import { EntryForm } from "~/components/entry-form";
import {
  deleteEntry,
  getEntryById,
  updateEntry,
} from "~/database/queries/entries.server";
import { updateSchema } from "~/database/schema/entries.server";
import { getSession } from "~/session.server";
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
  let action = formData.get("_action");
  if (action === "delete") {
    await deleteEntry(parseInt(params.entryId, 10));
    return redirect(`/entries/list`);
  }
  let date = formData.get("date");
  let type = formData.get("type");
  let text = formData.get("text");
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
  return redirect(`/entries/list`);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  let { entryId } = params;
  if (typeof entryId !== "string") {
    throw new Response("Not found", { status: 404 });
  }
  let session = await getSession(request.headers.get("Cookie"));
  if (!session.get("admin")) {
    return new Response(null, {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Login"',
      },
    });
  }
  let id = parseInt(entryId, 10);
  let entry = await getEntryById(id);
  if (!entry) {
    throw new Response("Not found", { status: 404 });
  }

  return entry;
}
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  if (!confirm("Are you sure you want to delete this entry?")) {
    e.preventDefault();
  }
};

export default function EditPage() {
  let entry = useLoaderData<typeof loader>();
  return (
    <section className="flex flex-1 flex-col  border">
      <div className="mb-5 w-full max-w-lg border border-blue-600">
        <EntryForm entry={entry} />
      </div>
      <div>
        <Form method="post" onSubmit={handleSubmit}>
          <button
            type="submit"
            className="text-gray-500 underline"
            name="_action"
            value="delete"
          >
            Delete entry ...
          </button>
        </Form>
      </div>
    </section>
  );
}