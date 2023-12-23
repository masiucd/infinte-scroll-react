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
            className="w-full rounded-md border-gray-700 bg-gray-800 text-gray-400 focus:border-primary-600 focus:ring-primary-600"
            style={{ colorScheme: "dark" }}
          />
        </div>
        <div className="flex gap-3  px-2 py-1">
          {[
            { label: "Work", value: "work" },
            { label: "Learning", value: "learning" },
            { label: "Interesting Thing", value: "interesting-thing" },
          ].map(({ label, value }) => (
            <label
              htmlFor={value}
              className="flex items-center gap-1 text-xs tracking-wide"
              key={value}
            >
              <input
                type="radio"
                name="type"
                id={value}
                value={value}
                defaultChecked={value === (entry?.type ?? "work")}
                required
                className="mr-2 border-gray-700 bg-gray-800 text-primary-600  focus:ring-primary-600 focus:ring-offset-gray-900"
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
            defaultValue={entry?.text}
            className="min-h-32 w-full rounded-md border-gray-700 bg-gray-800 text-white focus:border-primary-600 focus:ring-primary-600"
          />
        </div>

        <div className="flex justify-end  px-2 py-1">
          <button
            className="relative w-full cursor-pointer rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-gray-900 active:top-1"
            type="submit"
          >
            {fetcher.state !== "idle" ? "Saving..." : "Save"}
          </button>
        </div>
      </fieldset>
    </fetcher.Form>
  );
}
