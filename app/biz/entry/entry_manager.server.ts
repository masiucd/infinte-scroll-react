import {parseISO} from "date-fns";

import {insertEntry} from "~/persistence/entry.server";

import {type Input, InputSchema} from "./schema";

export const createEntry = async (input: Input) => {
  const validatedInput = InputSchema.parse(input);

  await insertEntry({
    text: validatedInput.text,
    type: input.type,
    createdAt: input.date ? parseISO(input.date) : undefined,
  });
};
