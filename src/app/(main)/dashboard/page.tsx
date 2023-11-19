import {revalidatePath} from "next/cache";

import {getEntries, storeEntry} from "@/app/persistence/entry/queries";
import {Button} from "@/components/button";
import {H1, Lead, Muted, P} from "@/components/text";
import {destroyCookie} from "@/utils/cookie";

async function action(formData: FormData) {
  "use server";
  let date = formData.get("date");
  let entryType = formData.get("entry-type");
  let text = formData.get("text");
  let userId = formData.get("userId");
  if (typeof date !== "string") {
    throw new Error("date is not a string");
  }
  if (typeof entryType !== "string") {
    throw new Error("entryType is not a string");
  }
  if (typeof text !== "string") {
    throw new Error("text is not a string");
  }
  if (typeof userId !== "string") {
    throw new Error("userId is not a string");
  }
  let entry = {
    date,
    entryType,
    text,
    userId,
  };
  let res = await storeEntry(entry);
  return res;
}

export default async function DashboardPage() {
  let entries = await getEntries();
  console.log("entries", entries);
  return (
    <div className="flex flex-1 flex-col border border-red-400 ">
      <form
        action={async () => {
          "use server";
          destroyCookie("auth");
          revalidatePath("/");
        }}
      >
        <button type="submit">Log out</button>
      </form>

      <div className="mb-10">
        <H1>Work Journal</H1>
        <P>
          My Work Journal where I write about what I&apos;ve been working on and
          what I&apos;ve learned.
        </P>
      </div>

      <fieldset className="mb-10 border">
        <form action={action} className="flex flex-col gap-2">
          <div>
            <input type="date" name="date" id="date" required />
          </div>

          <div className="flex gap-3">
            <label htmlFor="work" className="flex items-center gap-2">
              <input
                type="radio"
                name="entry-type"
                value="work"
                id="work"
                defaultChecked
              />
              Work
            </label>
            <label htmlFor="learn" className="flex items-center gap-2">
              <input type="radio" name="entry-type" value="learn" id="learn" />
              Learn
            </label>
            <label htmlFor="interesting" className="flex items-center gap-2">
              <input
                type="radio"
                name="entry-type"
                value="interesting"
                id="interesting"
              />
              Interesting
            </label>
          </div>

          <div>
            <textarea
              name="text"
              placeholder="Write something here..."
              className="text-gray-700"
              required
            ></textarea>
          </div>
          <input type="hidden" name="userId" value="1" />
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </fieldset>

      <div className="flex flex-col gap-5 pl-2">
        <Lead>
          Week of November 20<sup>th</sup>
        </Lead>
        <div className="pl-2">
          <Muted className="font-bold">Work</Muted>
          <ul className="list-disc pl-6">
            <li>first</li>
            <li>second</li>
          </ul>
        </div>

        <div className="pl-2">
          <Muted className="font-bold">Learnings</Muted>
          <ul className="list-disc pl-6">
            <li>first</li>
            <li>second</li>
            <li>third</li>
          </ul>
        </div>

        <div className="pl-2">
          <Muted className="font-bold">Intreating things</Muted>
          <ul className="list-disc pl-6">
            <li>first</li>
            <li>second</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
