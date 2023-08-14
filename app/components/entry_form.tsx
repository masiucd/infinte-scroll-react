import {useFetcher} from "@remix-run/react";
import {format} from "date-fns";
import {useEffect, useRef} from "react";

import {cn} from "~/lib/styles";
// import {useRef} from "react";
import Button from "~/ui/button";

import {FormGroup} from "./common/form_group";

type Props = {
  entry?: {
    id: number;
    date: string;
    text: string;
    type: string;
  };
};

export function EntryForm({entry}: Props) {
  let fetcher = useFetcher();
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (
      fetcher.type !== "init" &&
      textAreaRef.current &&
      fetcher.state === "idle"
    ) {
      textAreaRef.current.value = "";
      textAreaRef.current.focus();
    }
  }, [fetcher.state, fetcher.type]);
  return (
    <fetcher.Form method="POST">
      <fieldset
        disabled={fetcher.state === "submitting"}
        className={cn(
          "flex flex-col gap-3 rounded border p-2 disabled:opacity-70",
          fetcher.state === "submitting" && "animate-pulse"
        )}
      >
        <legend className="mb-2 text-lg font-bold">Create a new entry</legend>
        <div className="flex flex-col gap-3">
          <FormGroup>
            <input
              type="date"
              name="date"
              className="rounded border p-2 text-gray-900"
              defaultValue={entry?.date ?? format(new Date(), "yyyy-MM-dd")}
            />
          </FormGroup>

          <FormGroup className="flex gap-5">
            {[
              {
                label: "Work",
                value: "work",
              },
              {
                label: "Learnings",
                value: "learnings",
              },
              {
                label: "Thoughts",
                value: "thoughts",
              },
            ].map((option) => (
              <div className="flex items-center gap-2" key={option.value}>
                <input
                  type="radio"
                  name="type"
                  value={option.value}
                  defaultChecked={option.value === (entry?.type ?? "work")}
                  required
                />
                <label>{option.label}</label>
              </div>
            ))}
          </FormGroup>

          <FormGroup>
            <textarea
              name="text"
              placeholder="Write your entry here"
              className="h-32 w-full rounded border p-2 text-gray-900"
              required
              ref={textAreaRef}
              defaultValue={entry?.text}
            />
          </FormGroup>
          <input type="hidden" name="id" value={entry?.id} />
          <FormGroup className="flex justify-end">
            <Button type="submit" variant="primary" size="default">
              Save
            </Button>
          </FormGroup>
        </div>
      </fieldset>
    </fetcher.Form>
  );
}
