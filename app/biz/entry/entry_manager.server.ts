import type {Entry} from "@prisma/client";
import {format, parseISO} from "date-fns";

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

function transform(entries: Array<Omit<Entry, "updatedAt">>) {
  return entries.map((entry) => ({
    ...entry,
    // createdAt: format(entry.createdAt, "MMMM dd"),
  }));
}

export async function getEntries(take = 10, skip = 0) {
  const entries = await entryDao.getEntries(take, skip);
  return entries;
}
