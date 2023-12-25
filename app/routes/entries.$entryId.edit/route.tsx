import { redirect } from "@remix-run/node";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { FormEvent } from "react";
import { EntryForm } from "~/components/entry-form";
import { deleteEntry } from "~/database/queries/entries.server";
import { getSession } from "~/session.server";
import { update } from "./entry.server";
import { validateAdmin } from "~/utils/validate-admin.server";
import { EntryFormWrapper } from "~/components/entry-form-wrapper";
import { getThemeCookie } from "~/utils/theme.server";
import { getEntry } from "./entry";

export function meta({ params }: MetaArgs) {
  return [
    { title: "My working journal - Edit entry" },
    {
      name: "description",
      content: `Edit entry - ${params.entryId}`,
    },
  ];
}

export async function action({ request, params }: ActionFunctionArgs) {
  await validateAdmin(request);
  if (typeof params.entryId !== "string") {
    throw new Response("Not found", { status: 404, statusText: "Not found" });
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
  await update(params.entryId, {
    date,
    type,
    text,
  });
  return redirect(`/entries/list`);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  let { entryId } = params;
  if (typeof entryId !== "string") {
    throw new Response("Not found", { status: 404, statusText: "Not found" });
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
  let entry = await getEntry(request, entryId);
  if (!entry) {
    throw new Response("Not found", {
      status: 404,
      statusText: "Not found",
    });
  }
  return {
    entry,
    theme: await getThemeCookie(request),
  };
}

function handleSubmit(e: FormEvent<HTMLFormElement>) {
  if (!confirm("Are you sure you want to delete this entry?")) {
    e.preventDefault();
  }
}

export default function EditEntryPage() {
  let { entry, theme } = useLoaderData<typeof loader>();
  return (
    <>
      <EntryFormWrapper>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Edit entry
        </p>
        <EntryForm entry={entry} theme={theme} />
      </EntryFormWrapper>
      <div className="px-2 sm:px-0">
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
    </>
  );
}
