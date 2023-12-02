import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { NewEntry } from "~/database/db";
import { db, entries } from "~/database/db";

export const meta: MetaFunction = () => {
  return [
    { title: "My working journal" },
    {
      name: "description",
      content: "Here where I journal my progress as a developer",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let fields = Object.fromEntries(formData.entries());
  console.log("fields", fields);

  let newEntry = {
    createdAt: fields.date,
    type: fields.type,
    content: fields.content,
  } as NewEntry;

  let result = db.insert(entries).values(newEntry).run();
  return result;
}

export default function Index() {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl items-center border">
      <div className="w-full max-w-lg border border-blue-600">
        <Form method="post">
          <div>
            <input type="date" name="date" />
          </div>

          <div className="flex gap-3 border">
            <label htmlFor="work" className="flex items-center gap-1">
              <input type="radio" name="type" id="work" value="work" />
              <span>Work</span>
            </label>
            <label
              htmlFor="interesting-thing"
              className="flex items-center gap-1"
            >
              <input
                type="radio"
                name="type"
                id="interesting-thing"
                value="interesting-thing"
              />
              <span>Interesting thing</span>
            </label>
            <label htmlFor="learning" className="flex items-center gap-1">
              <input type="radio" name="type" id="learning" value="learning" />
              <span>Learning</span>
            </label>
          </div>

          <div>
            <textarea
              name="content"
              placeholder="What did you do today?"
              required
            />
          </div>

          <div>
            <button
              className="rounded bg-blue-600 px-2 py-1 text-white"
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
