import { useFetcher } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { useRef } from "react";

export function EntryForm({
  entry,
}: {
  entry: {
    id: number;
    text: string;
    type: string;
    date: string;
  };
}) {
  let fetcher = useFetcher();
  let ref = useRef<HTMLTextAreaElement | null>(null);
  return (
    <fetcher.Form
      method="post"
      action={`/entries/${entry.id}/edit`}
      className="flex flex-col gap-2"
    >
      <fieldset
        disabled={fetcher.state === "submitting"}
        className="flex flex-col gap-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div>
          <input
            type="date"
            name="date"
            // defaultValue={format(new Date(), "yyyy-MM-dd")}
            defaultValue={format(parseISO(entry.date), "yyyy-MM-dd")}
            className="text-gray-400"
          />
        </div>
        <div className="flex gap-3 border px-2 py-1">
          <label htmlFor="work" className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="type"
              id="work"
              value="work"
              defaultChecked={entry.type === "work"}
              required
            />
            <span>Work</span>
          </label>
          <label
            htmlFor="interesting-thing"
            className="flex items-center gap-1 text-sm"
          >
            <input
              type="radio"
              name="type"
              id="interesting-thing"
              value="interesting-thing"
              defaultChecked={entry.type === "interesting-thing"}
              required
            />
            <span>Interesting thing</span>
          </label>
          <label htmlFor="learning" className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="type"
              id="learning"
              value="learning"
              defaultChecked={entry.type === "learning"}
              required
            />
            <span>Learning</span>
          </label>
        </div>

        <div>
          <textarea
            name="text"
            placeholder="What did you do today?"
            required
            ref={ref}
            className="w-full text-gray-500"
            defaultValue={entry.text}
          />
        </div>

        <div className="flex justify-end border px-2 py-1">
          <button
            className="relative rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-700 active:top-1"
            type="submit"
          >
            {fetcher.state === "submitting" ? "Saving..." : "Save"}
          </button>
        </div>
      </fieldset>
    </fetcher.Form>
  );
}
