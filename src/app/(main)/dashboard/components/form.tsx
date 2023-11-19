"use client";

import {useFormState, useFormStatus} from "react-dom";

import {Button} from "@/components/button";

import {action} from "../actions";

function SubmitButton() {
  let {pending} = useFormStatus();
  console.log("pending", pending);
  return (
    <div>
      <Button type="submit" aria-disabled={pending}>
        Submit
      </Button>
    </div>
  );
}

export default function Form() {
  let [state, formAction] = useFormState(action, {message: null});
  console.log("state", state);
  return (
    <fieldset className="mb-10 flex items-center border px-2">
      <form action={formAction} className="flex flex-col gap-2">
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
        <SubmitButton />
      </form>
    </fieldset>
  );
}
