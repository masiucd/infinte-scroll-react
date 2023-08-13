import {useFetcher} from "@remix-run/react";
import {useRef} from "react";

import Button from "~/ui/button";

import {FormGroup} from "./common/form_group";

type Props = {
  entry: {
    id: number;
    date: string;
    text: string;
    type: string;
  };
};

export function EntryForm({entry}: Props) {
  let fetcher = useFetcher();
  let textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <fetcher.Form method="POST">
      <fieldset
        disabled={fetcher.state === "submitting"}
        className="flex flex-col gap-3 rounded border p-2 disabled:opacity-70 "
      >
        <legend className="mb-2 text-lg font-bold">Create a new entry</legend>
        <div className="flex flex-col gap-3">
          <FormGroup>
            <input
              type="date"
              name="date"
              className="rounded border p-2 text-gray-900"
              // defaultValue={format(new Date(), "yyyy-MM-dd")}
              defaultValue={entry.date}
            />
          </FormGroup>

          <FormGroup className="flex gap-5">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="work"
                defaultChecked={entry.type === "work"}
                required
              />
              <label>Work</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="learnings"
                defaultChecked={entry.type === "learnings"}
              />
              <label>Learnings</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="thoughts"
                defaultChecked={entry.type === "thoughts"}
              />
              <label>Thoughts</label>
            </div>
          </FormGroup>

          <FormGroup>
            <textarea
              name="text"
              placeholder="Write your entry here"
              className="h-32 w-full rounded border p-2 text-gray-900"
              required
              ref={textAreaRef}
              defaultValue={entry.text}
            />
          </FormGroup>

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
