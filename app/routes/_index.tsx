import type {V2_MetaFunction} from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    {title: "My working journal"},
    {
      name: "description",
      content: "My working journal is a place where I write about my work..",
    },
  ];
};

export default function Index() {
  return (
    <div className="p-10">
      <h1 className="mb-2 text-5xl font-bold">Work journal</h1>
      <p className="mb-4 text-lg text-gray-300">
        Learnings and thoughts about my work as a software developer. Updated
        weekly.
      </p>

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
