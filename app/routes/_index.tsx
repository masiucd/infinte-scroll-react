import {type ActionArgs, redirect, type V2_MetaFunction} from "@remix-run/node";
import {Form} from "@remix-run/react";
import type {ReactNode} from "react";

import {cn} from "~/lib/styles";

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
  const work = body.get("work") as string | null;
  const learnings = body.get("learnings") as string | null;
  const thoughts = body.get("thoughts") as string | null;
  const text = body.get("text") as string | null;
  // TODO store in database
  return redirect("/");
}

type FormGroupProps = {
  className?: string;
  children: ReactNode;
};
function FormGroup({className, children}: FormGroupProps) {
  return <div className={cn("mb-1", className)}>{children}</div>;
}

export default function Index() {
  return (
    <div className="p-10">
      <h1 className="mb-2 text-5xl font-bold">Work journal</h1>
      <p className="mb-4 text-lg text-gray-300">
        Learnings and thoughts about my work as a software developer. Updated
        weekly.
      </p>

      <div className="mb-5 max-w-lg border p-1">
        <Form method="POST">
          <p>Create a new entry</p>
          <div className="flex flex-col gap-3">
            <FormGroup>
              <input
                type="date"
                name="date"
                className="rounded border p-2 text-gray-900"
              />
            </FormGroup>

            <FormGroup className="flex gap-5">
              <div className="flex items-center gap-2">
                <input type="radio" name="work" id="work" />
                <label htmlFor="work">Work</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="radio" name="learnings" id="learnings" />
                <label htmlFor="learnings">Learnings</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="radio" name="thoughts" id="thoughts" />
                <label htmlFor="thoughts">Thoughts</label>
              </div>
            </FormGroup>

            <FormGroup>
              <textarea
                name="text"
                id="text"
                placeholder="Write your entry here"
                className="h-32 w-full rounded border p-2 text-gray-900"
              />
            </FormGroup>

            <FormGroup className="flex justify-end">
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                type="submit"
              >
                Save
              </button>
            </FormGroup>
          </div>
        </Form>
      </div>

      <section className="flex flex-col gap-2 p-1">
        <p className="mb-2 font-bold">
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
        </div>
      </section>
    </div>
  );
}
