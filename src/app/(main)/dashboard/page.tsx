import {revalidatePath} from "next/cache";

import {H1, Lead, Muted, P} from "@/components/text";
import {destroyCookie} from "@/utils/cookie";

export default function DashboardPage() {
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

      <fieldset className="border">
        <form action="" className="flex flex-col gap-2">
          <div>
            <input type="date" name="date" id="date" />
          </div>

          <div>
            <label>
              <input type="radio" name="work" value="work" />
              Work
            </label>
            <label>
              <input type="radio" name="work" value="learn" />
              Learn
            </label>
            <label>
              <input type="radio" name="work" value="interesting" />
              Interesting
            </label>
          </div>

          <div>
            <textarea
              name="text"
              placeholder="Write something here..."
              className="text-gray-700"
            ></textarea>
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
