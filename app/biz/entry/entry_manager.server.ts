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

export async function getEntries(take = 10, skip = 0) {
  const entries = await entryDao.getEntries(take, skip);
  return groupEntries(entries);
}

function groupEntries(entries: Omit<Entry, "id" | "updatedAt">[]) {
  return entries.reduce(
    (store: Record<string, Omit<Entry, "id" | "updatedAt">[]>, entry) => {
      // format to mont name dath and year
      const date = format(entry.createdAt, "MMMM dd, yyyy");
      if (store[date]) {
        store[date].push(entry);
      } else {
        store[date] = [entry];
      }
      return store;
    },
    {}
  );
}
