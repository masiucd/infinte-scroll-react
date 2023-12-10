import { useFetcher } from "@remix-run/react";
import { format, parseISO } from "date-fns";
import { useEffect, useRef } from "react";

type Entry = {
  id: number;
  text: string;
  type: string;
  date: string;
};
type Props = {
  entry?: Entry;
};

export function EntryForm({ entry }: Props) {
  let fetcher = useFetcher({ key: "entry-form" });
  let ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current && fetcher.data && fetcher.state === "idle") {
      ref.current.value = "";
      ref.current.focus();
    }
  }, [fetcher.data, fetcher.state]);

  return (
    <fetcher.Form method="post" className="flex flex-col gap-2">
      <fieldset
        disabled={fetcher.state !== "idle"}
        className="flex flex-col gap-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div>
          <input
            type="date"
            name="date"
            defaultValue={format(
              entry?.date ? parseISO(entry.date) : new Date(),
              "yyyy-MM-dd",
            )}
            className="text-gray-400"
          />
        </div>
        <div className="flex gap-3 border px-2 py-1">
          {[
            { label: "Work", value: "work" },
            { label: "Learning", value: "learning" },
            { label: "Interesting Thing", value: "interesting-thing" },
          ].map(({ label, value }) => (
            <label
              htmlFor={value}
              className="flex items-center gap-1 text-sm"
              key={value}
            >
              <input
                type="radio"
                name="type"
                id={value}
                value={value}
                defaultChecked={value === (entry?.type ?? "work")}
                required
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div>
          <textarea
            name="text"
            placeholder="What did you do today?"
            required
            ref={ref}
            className="w-full text-gray-500"
            defaultValue={entry?.text}
          />
        </div>

        <div className="flex justify-end border px-2 py-1">
          <button
            className="relative rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-700 active:top-1"
            type="submit"
          >
            {fetcher.state !== "idle" ? "Saving..." : "Save"}
          </button>
        </div>
      </fieldset>
    </fetcher.Form>
  );
}
