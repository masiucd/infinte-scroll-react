import { type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { db } from "~/database/db";

export const meta: MetaFunction = () => {
  return [
    { title: "My working journal" },
    {
      name: "description",
      content: "Here where I journal my progress as a developer",
    },
  ];
};

function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let date = formData.get("date");
  let type = formData.get("type");
  let text = formData.get("content");
  if (
    typeof date !== "string" ||
    typeof type !== "string" ||
    typeof text !== "string"
  ) {
    throw new Error("Bad request");
  }
  // TODO to test when connection is slow
  await sleep();
  return db.entry.create({
    data: {
      date: new Date(date),
      type,
      text,
    },
  });
}

export async function loader() {
  let entries = await db.entry.findMany();
  return {
    entries,
  };
}

export default function Index() {
  let fetcher = useFetcher();
  let data = useLoaderData<typeof loader>();
  let ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current && fetcher.state === "idle") {
      ref.current.value = "";
      ref.current.focus();
    }
  }, [fetcher.state]);

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col  justify-center border">
      <div className="w-full max-w-lg border border-blue-600">
        <fetcher.Form method="post">
          <fieldset
            disabled={fetcher.state === "submitting"}
            className="flex flex-col gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div>
              <input
                type="date"
                name="date"
                defaultValue={format(new Date(), "yyyy-MM-dd")}
                className="text-gray-400"
              />
            </div>
            <div className="flex gap-3 border px-2 py-1">
              <label htmlFor="work" className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="type"
                  id="work"
                  value="work"
                  defaultChecked
                  required
                />
                <span>Work</span>
              </label>
              <label
                htmlFor="interesting-thing"
                className="flex items-center gap-1 text-sm"
              >
                <input
                  type="radio"
                  name="type"
                  id="interesting-thing"
                  value="interesting-thing"
                  required
                />
                <span>Interesting thing</span>
              </label>
              <label
                htmlFor="learning"
                className="flex items-center gap-1 text-sm"
              >
                <input
                  type="radio"
                  name="type"
                  id="learning"
                  value="learning"
                  required
                />
                <span>Learning</span>
              </label>
            </div>

            <div>
              <textarea
                name="content"
                placeholder="What did you do today?"
                required
                ref={ref}
                className="text-gray-400"
              />
            </div>

            <div className="flex justify-end border px-2 py-1">
              <button
                className="rounded bg-blue-600 px-2 py-1 text-white"
                type="submit"
              >
                {fetcher.state === "submitting" ? "Saving..." : "Save"}
              </button>
            </div>
          </fieldset>
        </fetcher.Form>
      </div>
      <ul>
        {data.entries.map((entry) => (
          <li key={entry.id}>
            <div className="flex gap-2">
              <div className="text-sm text-gray-500">
                {format(new Date(entry.date), "dd MMM yyyy")}
              </div>
              <div className="text-sm text-gray-500">{entry.type}</div>
            </div>
            <div>{entry.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
