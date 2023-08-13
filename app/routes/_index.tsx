import type {Entry} from "@prisma/client";
import {
  type ActionArgs,
  json,
  type SerializeFrom,
  type V2_MetaFunction,
} from "@remix-run/node";
import {Link, useFetcher, useLoaderData} from "@remix-run/react";
import {format, parse, parseISO, startOfWeek} from "date-fns";
import {useEffect, useRef} from "react";
import invariant from "tiny-invariant";

import {FormGroup} from "~/components/common/form_group";
import {cn} from "~/lib/styles";
import Button from "~/ui/button";
import {db} from "~/utils/prisma.server";

export let meta: V2_MetaFunction = () => {
  return [
    {title: "My working journal"},
    {
      name: "description",
      content: "My working journal is a place where I write about my work..",
    },
  ];
};

async function sleep(ms = 2000) {
  return await new Promise((resolve) => setTimeout(resolve, 1000));
}

export async function action({request}: ActionArgs) {
  let body = await request.formData();
  let date = body.get("date");
  let type = body.get("type");
  let text = body.get("text");

  if (!date || !type || !text) {
    return json(
      {
        error: "Invalid request",
      },
      {
        status: 400,
      }
    );
  }

  invariant(typeof text === "string");
  invariant(typeof type === "string");
  invariant(typeof date === "string");

  // simulate a slow request
  await sleep();
  return await db.entry.create({
    data: {
      text,
      type,
      date: parseISO(date),
    },
  });
}

export async function loader() {
  let entries = await db.entry.findMany();
  let weeks = transformEntriesTwo(entries);
  return weeks;
}

function groupEntriesByWeekTwo(entries: Entry[]) {
  const xs = entries.map((e) => ({
    ...e,
    date: e.date.toISOString().substring(0, 10),
  }));
  return xs.reduce<Record<string, typeof xs>>((obj, item) => {
    let sunday = startOfWeek(parseISO(item.date));
    let sundayString = format(sunday, "yyyy-MM-dd");
    if (!obj[sundayString]) {
      obj[sundayString] = [];
    }
    obj[sundayString].push(item);
    return obj;
  }, {});
}

function transformEntriesTwo(entries: Entry[]) {
  let entriesByWeek = groupEntriesByWeekTwo(entries);
  return [...Object.keys(entriesByWeek)]
    .sort((a, b) => a.localeCompare(b))
    .map((week) => ({
      week,
      work: entriesByWeek[week].filter(({type}) => type === "work"),
      learnings: entriesByWeek[week].filter(({type}) => type === "learnings"),
      thoughts: entriesByWeek[week].filter(({type}) => type === "thoughts"),
    }));
}

// TODO to this on the server
// function groupEntriesByWeek(entries: SerializeFrom<typeof loader>) {
//   return entries.reduce<Record<string, typeof entries>>((obj, item) => {
//     let sunday = startOfWeek(parseISO(item.date));
//     let sundayString = format(sunday, "yyyy-MM-dd");
//     if (!obj[sundayString]) {
//       obj[sundayString] = [];
//     }
//     obj[sundayString].push(item);
//     return obj;
//   }, {});
// }

// function transformEntries(entries: SerializeFrom<typeof loader>) {
//   let entriesByWeek = groupEntriesByWeek(entries);
//   return [...Object.keys(entriesByWeek)]
//     .sort((a, b) => a.localeCompare(b))
//     .map((week) => ({
//       week,
//       work: entriesByWeek[week].filter(({type}) => type === "work"),
//       learnings: entriesByWeek[week].filter(({type}) => type === "learnings"),
//       thoughts: entriesByWeek[week].filter(({type}) => type === "thoughts"),
//     }));
// }

export default function Main() {
  let fetcher = useFetcher();
  let weeks = useLoaderData<typeof loader>();
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current && fetcher.state === "idle") {
      textAreaRef.current.value = "";
      textAreaRef.current.focus();
    }
  }, [fetcher.state]);

  return (
    <div className="p-10">
      <h1 className="mb-2 text-5xl font-bold">Work journal</h1>
      <p className="mb-4 text-lg text-gray-300">
        Learnings and thoughts about my work as a software developer. Updated
        weekly.
      </p>
      <div className="mb-5 max-w-xl">
        <fetcher.Form method="POST">
          <fieldset
            disabled={fetcher.state === "submitting"}
            className="flex
            flex-col gap-3 rounded border bg-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 p-2 disabled:opacity-70 "
          >
            <legend className="mb-2 text-lg font-bold">
              Create a new entry
            </legend>
            <div className="flex flex-col gap-3">
              <FormGroup>
                <input
                  type="date"
                  name="date"
                  className="rounded border p-2 text-gray-900"
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                />
              </FormGroup>

              <FormGroup className="flex gap-5">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="work"
                    defaultChecked
                    required
                  />
                  <label>Work</label>
                </div>

                <div className="flex items-center gap-2">
                  <input type="radio" name="type" value="learnings" />
                  <label>Learnings</label>
                </div>

                <div className="flex items-center gap-2">
                  <input type="radio" name="type" value="thoughts" />
                  <label>Thoughts</label>
                </div>
              </FormGroup>

              <FormGroup>
                <textarea
                  name="text"
                  placeholder="Write your entry here"
                  className="h-32 w-full rounded border p-2 text-gray-900"
                  required
                  ref={textAreaRef}
                />
              </FormGroup>

              <FormGroup className="flex justify-end">
                <Button type="submit" variant="primary" size="default">
                  Save
                </Button>
              </FormGroup>
            </div>
          </fieldset>
        </fetcher.Form>
      </div>

      <section className="flex flex-col gap-2 space-y-2 p-1">
        {weeks.map(({week, work, learnings, thoughts}) => (
          <div key={week} className="mb-2 flex flex-col gap-2 p-2">
            <p className="relative mb-2 w-[fit-content] text-xl font-bold text-gray-300 drop-shadow-md">
              <span className="rounded after:absolute after:bottom-1 after:left-0 after:h-2 after:w-full after:rotate-1 after:bg-blue-500 after:content-['']"></span>
              <span className="relative">
                Week of {format(parseISO(week), "MMMM do, yyyy")}
              </span>
            </p>

            <div className={cn(work.length === 0 && "opacity-50")}>
              <p className="mb-2">Work</p>

              <EntryList entries={work} />
            </div>

            <div className={cn(learnings.length === 0 && "opacity-50")}>
              <p className="mb-2">Learnings</p>

              <EntryList entries={learnings} />
            </div>

            <div className={cn(thoughts.length === 0 && "opacity-50")}>
              <p className="mb-2">Thoughts</p>
              <EntryList entries={thoughts} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function EntryList({
  entries,
}: {
  entries: Awaited<ReturnType<typeof loader>>[number][
    | "learnings"
    | "thoughts"
    | "work"];
}) {
  return (
    <ul className="ml-10 flex list-disc flex-col gap-3">
      {entries.map((entry) => (
        <EntryItem key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}

function EntryItem({
  entry,
}: {
  entry: {
    id: number;
    text: string;
    date: string;
    type: string;
  };
}) {
  return (
    <li key={entry.id} className="group flex gap-2">
      <span>{entry.text}</span>
      <Link
        className="text-blue-500 opacity-0 group-hover:opacity-100"
        to={`/entries/${entry.id}/edit`}
      >
        Edit
      </Link>
    </li>
  );
}
