import { type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { format, parseISO, startOfWeek } from "date-fns";
import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import { db } from "~/database/db.server";
import { insertEntry } from "~/database/queries/entries.server";
import { insertSchema } from "~/database/schema/entries.server";
import { sleep } from "~/utils/sleep";

export const meta: MetaFunction = () => [
  { title: "My working journal" },
  {
    name: "description",
    content: "Here where I journal my progress as a developer",
  },
];

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
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
      dateString,
      work: groupedEntries[dateString]
        .filter((entry) => entry.type === EntryType.work)
        .map((entry) => ({
          ...entry,
          date: entry.date.toISOString(),
        })),
      learning: groupedEntries[dateString]
        .filter((entry) => entry.type === EntryType.learning)
        .map((entry) => ({
          ...entry,
          date: entry.date.toISOString(),
        })),
      interestingThing: groupedEntries[dateString]
        .filter((entry) => entry.type === EntryType.interestingThing)
        .map((entry) => ({
          ...entry,
          date: entry.date.toISOString(),
        })),
    }));
}

export default function Entries() {
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
    <>
      <section className="flex flex-1 flex-col  border">
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
                  name="text"
                  placeholder="What did you do today?"
                  required
                  ref={ref}
                  className="w-full text-gray-500"
                />
              </div>

              <div className="flex justify-end border px-2 py-1">
                <button
                  className="relative rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-700 active:top-1"
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
              <li key={entry.dateString} className="flex flex-col gap-3">
                <strong className="font-semibold capitalize tracking-tighter text-gray-100">
                  Week of {format(parseISO(entry.dateString), "MMMM do")}
                </strong>
                {entry.work.length > 0 && (
                  <div className="mb-3">
                    <p className="text-gray-200">Work</p>
                    <EntryList>
                      {entry.work.map((entry) => (
                        <EntryItem key={entry.id} entry={entry} />
                      ))}
                    </EntryList>
                  </div>
                )}
                {entry.interestingThing.length > 0 && (
                  <div className="mb-3">
                    <p className="text-gray-200">Interesting thing</p>
                    <EntryList>
                      {entry.interestingThing.map((entry) => (
                        <EntryItem key={entry.id} entry={entry} />
                      ))}
                    </EntryList>
                  </div>
                )}
                {entry.learning.length > 0 && (
                  <div className="mb-3">
                    <p className="text-gray-200">Learning</p>
                    <EntryList>
                      {entry.learning.map((entry) => (
                        <EntryItem key={entry.id} entry={entry} />
                      ))}
                    </EntryList>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-center">No entries yet</p>
          )}
        </ol>
      </section>
    </>
  );
}

function EntryList({ children }: PropsWithChildren) {
  return (
    <ol className="ml-10 flex list-disc flex-col gap-1 p-0">{children}</ol>
  );
}

type LoaderReturnType = Awaited<ReturnType<typeof loader>>[number];
type EntryType =
  | LoaderReturnType["interestingThing"][number]
  | LoaderReturnType["work"][number]
  | LoaderReturnType["learning"][number];

function EntryItem({ entry }: { entry: EntryType }) {
  return (
    <li className="group">
      <span className="mr-2">{entry.text}</span>
      <Link
        className="opacity-0 transition-opacity duration-200 hover:text-sky-300 group-hover:opacity-100 "
        to={`/entries/${entry.id}/edit`}
      >
        Edit
      </Link>
    </li>
  );
}
