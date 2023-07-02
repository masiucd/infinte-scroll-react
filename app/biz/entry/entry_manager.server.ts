import {parseISO} from "date-fns";

import * as entryDao from "~/persistence/entry.server";

import {type Input, InputSchema} from "./schema";

export async function createEntry(input: Input) {
  const validatedInput = InputSchema.parse(input);

  return await entryDao.insertEntry({
    text: validatedInput.text,
    type: input.type,
    createdAt: parseISO(input.date),
  });
}

export async function getEntries(take = 10, skip = 0) {
  return await entryDao.getEntries(take, skip);
}
