import {revalidatePath} from "next/cache";

import {getEntries} from "@/app/persistence/entry/queries";
import {H1, Lead, Muted, P} from "@/components/text";
import {destroyCookie} from "@/utils/cookie";

import Form from "./components/form";

export default async function DashboardPage() {
  let entries = await getEntries();
  console.log("entries", entries);

  // const x = {
  //   date: "2020-11-20",
  //   entries: [
  //     {
  //       entryType: "work",
  //       text: "first",
  //     },
  //     {
  //       entryType: "work",
  //       text: "second",
  //     },
  //   ],
  // };

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
      <Form />

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
