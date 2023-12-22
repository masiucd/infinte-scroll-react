import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { format, parseISO, startOfWeek } from "date-fns";
import type { PropsWithChildren } from "react";
import { EntryForm } from "~/components/entry-form";
import { db } from "~/database/db.server";
import { insertEntry } from "~/database/queries/entries.server";
import { insertSchema } from "~/database/schema/entries.server";
import { getSession } from "~/session.server";
import { sleep } from "~/utils/sleep";
import { validateAdmin } from "~/utils/validate-admin.server";

export const meta: MetaFunction = () => [
  { title: "My working journal" },
  {
    name: "description",
    content: "Here where I journal my progress as a developer",
  },
];

export async function action({ request }: ActionFunctionArgs) {
  await validateAdmin(request);
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

async function getGroupedEntries() {
  let entries = await db.entry.findMany();
  return entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    let start = startOfWeek(entry.date, { weekStartsOn: MONDAY });
    let dateString = format(start, "yyyy-MM-dd");
    acc[dateString] ||= [];
    acc[dateString].push(entry);
    return acc;
  }, {});
}

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  let groupedEntries = await getGroupedEntries();
  return {
    loggedIn: !!session.data.admin,
    entries: Object.keys(groupedEntries)
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
      })),
  };
}

export default function Entries() {
  let { entries, loggedIn } = useLoaderData<typeof loader>();
  return (
    <>
      <section className="flex flex-1 flex-col ">
        {loggedIn && (
          <div className="mb-5 w-full max-w-lg bg-gray-900 p-1">
            <EntryForm />
          </div>
        )}

        <ol className="ml-2 flex  flex-col gap-6">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <li key={entry.dateString} className="flex flex-col gap-3">
                <strong className="font-semibold capitalize tracking-tighter text-gray-50">
                  Week of {format(parseISO(entry.dateString), "MMMM do")}
                </strong>
                {entry.work.length > 0 && (
                  <EntryWrapper title="Work">
                    <EntryList>
                      {entry.work.map((entry) => (
                        <EntryItem
                          key={entry.id}
                          entry={entry}
                          loggedIn={loggedIn}
                        />
                      ))}
                    </EntryList>
                  </EntryWrapper>
                )}
                {entry.interestingThing.length > 0 && (
                  <EntryWrapper title="Interesting thing">
                    <EntryList>
                      {entry.interestingThing.map((entry) => (
                        <EntryItem
                          key={entry.id}
                          entry={entry}
                          loggedIn={loggedIn}
                        />
                      ))}
                    </EntryList>
                  </EntryWrapper>
                )}
                {entry.learning.length > 0 && (
                  <EntryWrapper title="Learning">
                    <EntryList>
                      {entry.learning.map((entry) => (
                        <EntryItem
                          key={entry.id}
                          entry={entry}
                          loggedIn={loggedIn}
                        />
                      ))}
                    </EntryList>
                  </EntryWrapper>
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

function EntryWrapper({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="mb-3">
      <p className="text-gray-300">{title}</p>
      {children}
    </div>
  );
}

function EntryList({ children }: PropsWithChildren) {
  return (
    <ol className="ml-10 flex list-disc flex-col gap-1 p-0">{children}</ol>
  );
}

type LoaderReturnType = Awaited<ReturnType<typeof loader>>["entries"][number];
type EntryType =
  | LoaderReturnType["interestingThing"][number]
  | LoaderReturnType["work"][number]
  | LoaderReturnType["learning"][number];

function EntryItem({
  entry,
  loggedIn,
}: {
  entry: EntryType;
  loggedIn: boolean;
}) {
  return (
    <li className="group">
      <span className="mr-2 text-gray-300">{entry.text}</span>
      {loggedIn && (
        <Link
          className="opacity-0 transition-opacity duration-200 hover:text-sky-300 group-hover:opacity-100 "
          to={`/entries/${entry.id}/edit`}
        >
          Edit
        </Link>
      )}
    </li>
  );
}
