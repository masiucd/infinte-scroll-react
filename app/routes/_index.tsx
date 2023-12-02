import type {MetaFunction} from "@remix-run/node";
import {db, entries} from "~/database/db";

export const meta: MetaFunction = () => {
  return [
    {title: "My working journal"},
    {
      name: "description",
      content: "Here where I journal my progress as a developer",
    },
  ];
};

export async function loader() {
  let rows = await db.select().from(entries);
  console.log("rows", rows);

  return {message: "Hello World"};
}

export default function Index() {
  return (
    <div className="bg-red-400">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
        dolore sit quod quis quos doloremque inventore aperiam, ut esse
        officiis, libero consequatur, exercitationem provident minima laboriosam
        sapiente commodi labore fuga?
      </p>
    </div>
  );
}
