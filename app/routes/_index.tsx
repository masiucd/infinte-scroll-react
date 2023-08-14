import {Entry} from "@prisma/client";
import {type ActionArgs, json, type V2_MetaFunction} from "@remix-run/node";
import {Link, useFetcher, useLoaderData} from "@remix-run/react";
import {format, parseISO} from "date-fns";
import {useEffect, useRef} from "react";
import invariant from "tiny-invariant";

import {FormGroup} from "~/components/common/form_group";
import {transformEntries} from "~/lib/entry/server-fns.server";
import {Icons} from "~/lib/icons";
import {cn} from "~/lib/styles";
import Button from "~/ui/button";
import {db} from "~/utils/prisma.server";
import {sleep} from "~/utils/sleep";

export let meta: V2_MetaFunction = () => {
  return [
    {title: "My working journal"},
    {
      name: "description",
      content: "My working journal is a place where I write about my work..",
    },
  ];
};

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
  let weeks = transformEntries(entries);
  return weeks;
}

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
    <div>
      <div className="mb-5 max-w-xl">
        <fetcher.Form method="POST">
          <fieldset
            disabled={fetcher.state === "submitting"}
            className="flex
            flex-col gap-3 rounded border  p-2 disabled:opacity-70 "
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
              <span className="rounded after:absolute after:bottom-1 after:left-0 after:h-2 after:w-full after:rotate-1 after:bg-blue-700 after:content-['']"></span>
              <span className="relative drop-shadow-lg">
                Week of {format(parseISO(week), "MMMM do, yyyy")}
              </span>
            </p>
            <Entry entries={work} type="work" />
            <Entry entries={learnings} type="learnings" />
            <Entry entries={thoughts} type="thoughts" />
          </div>
        ))}
      </section>
    </div>
  );
}

type EntryProps = {
  entries: Awaited<ReturnType<typeof loader>>[number][
    | "learnings"
    | "thoughts"
    | "work"];
  type: string;
};
function Entry({entries, type}: EntryProps) {
  return (
    <div className={cn(entries.length === 0 && "opacity-50")}>
      <p className="mb-2 capitalize">{type}</p>
      <ul className="ml-10 flex list-inside list-disc flex-col gap-1">
        {entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </div>
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
    <li key={entry.id} className="group flex">
      <Link
        className="list-item transition-opacity duration-200 ease-in-out hover:text-gray-100 "
        to={`/entries/${entry.id}/edit`}
      >
        <span className="group-hover:opacity-75">{entry.text}</span>
        <span className="transition-colors duration-150 hover:text-blue-500">
          <Icons.Pen
            size={16}
            className="ml-1 inline text-blue-500 opacity-0 transition-opacity duration-200 ease-in-out hover:text-gray-100 group-hover:opacity-100"
          />
        </span>
      </Link>
    </li>
  );
}
