import {type ActionArgs, json, type V2_MetaFunction} from "@remix-run/node";
import {Link, useFetcher, useLoaderData} from "@remix-run/react";
import {format, parseISO, startOfWeek} from "date-fns";
import {useEffect, useRef} from "react";

import {FormGroup} from "~/components/common/form_group";
import {cn} from "~/lib/styles";
import Button from "~/ui/button";
import {db} from "~/utils/prisma.server";

export const meta: V2_MetaFunction = () => {
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
  const body = await request.formData();
  const date = body.get("date");
  const type = body.get("type");
  const text = body.get("text");

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

  if (typeof text !== "string")
    throw new Response("Text must be of type string", {status: 401});
  if (typeof type !== "string")
    throw new Response("type must be of type string", {status: 401});
  if (typeof date !== "string")
    throw new Response("date must be of type string", {status: 401});

  // simulate a slow request
  await sleep();
  return await db.entry.create({
    data: {
      text,
      type,
      date: parseISO(date),
    },
  });
  // return redirect("/");
}

export async function loader() {
  const entries = await db.entry.findMany();
  console.log("entries", entries);
  return entries;
}

export default function Index() {
  const fetcher = useFetcher();
  const entries = useLoaderData<typeof loader>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
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
        {/* {data.map(({dateString, work, learnings, thoughts}) => (
          <div key={dateString} className="mb-2 flex flex-col gap-2 p-2">
            <p className="relative mb-2 w-[fit-content] text-xl font-bold text-gray-300 drop-shadow-md">
              <span className="rounded after:absolute after:bottom-1 after:left-0 after:h-2 after:w-full after:rotate-1 after:bg-blue-500 after:content-['']"></span>
              <span className="relative">
                Week of {format(parseISO(dateString), "MMMM do, yyyy")}
              </span>
            </p>

            <div className={cn(work.length === 0 && "opacity-50")}>
              <p className="mb-2">Work</p>
              <ul className="ml-10 flex list-disc flex-col gap-3">
                {work.map((work) => (
                  <li key={work.id}>{work.text}</li>
                ))}
              </ul>
            </div>

            <div className={cn(learnings.length === 0 && "opacity-50")}>
              <p className="mb-2">Learnings</p>
              <ul className="ml-10 flex list-disc flex-col gap-3">
                {learnings.map((learnings) => (
                  // @ts-ignore
                  <EntryItem key={learnings.id} entry={learnings} />
                ))}
              </ul>
            </div>

            <div className={cn(thoughts.length === 0 && "opacity-50")}>
              <p className="mb-2">Thoughts</p>
              <ul className="ml-10 flex list-disc flex-col gap-3">
                {thoughts.map((thoughts) => (
                  <li key={thoughts.id}>{thoughts.text}</li>
                ))}
              </ul>
            </div>
          </div>
        ))} */}
      </section>
    </div>
  );
}

function EntryItem({
  entry,
}: {
  entry: Awaited<ReturnType<typeof loader>>[number][
    | "learnings"
    | "thoughts"
    | "work"][number];
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
