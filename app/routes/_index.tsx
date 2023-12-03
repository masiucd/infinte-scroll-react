import { type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { format, parseISO, startOfWeek } from "date-fns";
import { useEffect, useRef } from "react";
import { db } from "~/database/db.server";
import { insertEntry } from "~/database/queries/entries.server";
import { insertSchema } from "~/database/schema/entries.server";

export const meta: MetaFunction = () => [
  { title: "My working journal" },
  {
    name: "description",
    content: "Here where I journal my progress as a developer",
  },
];

function sleep(ms = 1200) {
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
  let newEntry = insertSchema.parse({ date: new Date(date), type, text });
  return await insertEntry(newEntry);
}

const MONDAY = 1;
const EntryType = Object.freeze({
  work: "work",
  learning: "learning",
  interestingThing: "interesting-thing",
});
export async function loader() {
  let entries = await db.entry.findMany();
  let groupedEntries = entries.reduce<Record<string, typeof entries>>(
    (acc, entry) => {
      let start = startOfWeek(entry.date, { weekStartsOn: MONDAY });
      let dateString = format(start, "yyyy-MM-dd");
      acc[dateString] ||= [];
      acc[dateString].push(entry);
      return acc;
    },
    {},
  );

  return Object.keys(groupedEntries)
    .sort((a, b) => b.localeCompare(a))
    .map((dateString) => ({
      dateString: dateString,
      work: groupedEntries[dateString].filter(
        (entry) => entry.type === EntryType.work,
      ),
      learning: groupedEntries[dateString].filter(
        (entry) => entry.type === EntryType.learning,
      ),
      interestingThing: groupedEntries[dateString].filter(
        (entry) => entry.type === EntryType.interestingThing,
      ),
    }));
}

export default function Index() {
  let fetcher = useFetcher();
  let entries = useLoaderData<typeof loader>();
  let ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current && fetcher.state === "idle") {
      ref.current.value = "";
      ref.current.focus();
    }
  }, [fetcher.state]);

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col border">
      <article className="my-10">
        <h1>My working journal</h1>
        <p>
          Here where I journal my progress as a developer. I write about what I
          did, what I learned, and what I found interesting.
        </p>
      </article>
      <section className="flex flex-1 flex-col justify-center border">
        <div className="mb-5 w-full max-w-lg border border-blue-600">
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
                <label
                  htmlFor="work"
                  className="flex items-center gap-1 text-sm"
                >
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
        <ol className="ml-2 flex  flex-col gap-6">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <li key={entry.dateString} className="flex flex-col gap-1">
                <strong className="font-semibold capitalize tracking-tighter text-gray-100">
                  Week of {format(parseISO(entry.dateString), "MMMM do")}
                </strong>
                {entry.work.length > 0 && (
                  <div className="mb-3">
                    <p className="text-gray-400">Work</p>
                    <ol className="ml-5 flex list-disc flex-col gap-1 p-0">
                      {entry.work.map((entry) => (
                        <li key={entry.id}>
                          <span className="mr-1">{entry.text}</span>
                          <Link to={`/entries/${entry.id}/edit`}>Edit</Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {entry.interestingThing.length > 0 && (
                  <div className="mb-3">
                    <p className="text-gray-400">Interesting thing</p>
                    <ol className="ml-5 flex list-disc flex-col gap-1 p-0">
                      {entry.interestingThing.map((entry) => (
                        <li key={entry.id}>
                          <span className="mr-1">{entry.text}</span>
                          <Link to={`/entries/${entry.id}/edit`}>Edit</Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {entry.learning.length > 0 && (
                  <div className="mb-3">
                    <p className="text-gray-400">Learning</p>
                    <ol className="ml-5 flex list-disc flex-col gap-1 p-0">
                      {entry.learning.map((entry) => (
                        <li key={entry.id}>
                          <span className="mr-1">{entry.text}</span>
                          <Link to={`/entries/${entry.id}/edit`}>Edit</Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-center">No entries yet</p>
          )}
        </ol>
      </section>
    </div>
  );
}
