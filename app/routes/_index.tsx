import {type ActionArgs, json, type V2_MetaFunction} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";
import {format, parseISO, startOfWeek} from "date-fns";
import {useEffect, useRef} from "react";

import * as entryManager from "~/biz/entry/entry_manager.server";
import {FormGroup} from "~/components/common/form_group";
import Button from "~/ui/button";

export const meta: V2_MetaFunction = () => {
  return [
    {title: "My working journal"},
    {
      name: "description",
      content: "My working journal is a place where I write about my work..",
    },
  ];
};

export async function action({request}: ActionArgs) {
  const body = await request.formData();
  const date = body.get("date") as string | null;
  const type = body.get("type") as string | null;
  const text = body.get("text") as string | null;

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

  // simulate a slow request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await entryManager.createEntry({
    date,
    type,
    text,
  });
  // return redirect("/");
}

export async function loader() {
  return await entryManager.getEntries();
}

export default function Index() {
  const fetcher = useFetcher();
  const data = useLoaderData<typeof loader>();

  // TODO do this on the server
  const entriesByWeek = data.reduce((acc, entry) => {
    const sunday = startOfWeek(parseISO(entry.createdAt));
    const sundayString = format(sunday, "yyyy-MM-dd");

    if (!acc[sundayString]) {
      acc[sundayString] = [];
    }
    acc[sundayString].push(entry);
    return acc;
  }, {} as Record<string, typeof data>);

  const weeks = Object.keys(entriesByWeek)
    .sort((a, b) => a.localeCompare(b))
    .map(
      (dateString) =>
        ({
          dateString,
          work: entriesByWeek[dateString].filter((x) => x.type === "work"),
          learnings: entriesByWeek[dateString].filter(
            (x) => x.type === "learnings"
          ),
          thoughts: entriesByWeek[dateString].filter(
            (x) => x.type === "thoughts"
          ),
        } as const)
    );

  console.log("weeks", weeks);

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
      <div className="mb-5 max-w-lg border p-1">
        <fetcher.Form method="POST">
          <fieldset
            disabled={fetcher.state === "submitting"}
            className="disabled:opacity-70"
          >
            <p>Create a new entry</p>
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
                <Button
                  type="submit"
                  variant="primary"
                  size="default"
                  // disabled={fetcher.state === "submitting"}
                >
                  Save
                </Button>
              </FormGroup>
            </div>
          </fieldset>
        </fetcher.Form>
      </div>

      <section className="flex flex-col gap-2 p-1">
        <ul>
          {data.map((x) => (
            <li key={x.id}>
              <p className="mb-2 font-bold">
                {format(parseISO(x.createdAt), "MMMM dd")} <sup>th</sup>{" "}
              </p>
            </li>
          ))}
        </ul>
        {/* <p className="mb-2 font-bold">
          Week of July 19<sup>th</sup>, 2023
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <p>Work</p>
            <ul className="ml-10 list-disc">
              <li>First item</li>
              <li>Second item</li>
            </ul>
          </div>

          <div>
            <p>Learnings</p>
            <ul className="ml-10 list-disc">
              <li>First item</li>
              <li>Second item</li>
            </ul>
          </div>

          <div>
            <p>Thoughts</p>
            <ul className="ml-10 list-disc">
              <li>First item</li>
              <li>Second item</li>
            </ul>
          </div>
        </div> */}
      </section>
    </div>
  );
}
