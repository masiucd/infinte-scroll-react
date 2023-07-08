import {format, parseISO, startOfWeek} from "date-fns";

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
  return entries;
}

export async function getEntriesGroupedByWeeks(take = 10, skip = 0) {
  const entries = await entryDao.getEntries(take, skip);
  const entriesByWeek = transformEntriesByWeek(entries);
  return transformWeeks(entriesByWeek);
}

type PromiseReturnType<T extends (...args: any[]) => Promise<any>> = T extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : never;

function transformEntriesByWeek(entries: PromiseReturnType<typeof getEntries>) {
  return entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const sunday = startOfWeek(entry.createdAt);
    const sundayString = format(sunday, "yyyy-MM-dd");

    if (!acc[sundayString]) {
      acc[sundayString] = [];
    }
    acc[sundayString].push(entry);
    return acc;
  }, {});
}

function transformWeeks(
  entriesByWeek: ReturnType<typeof transformEntriesByWeek>
) {
  return Object.keys(entriesByWeek)
    .sort((a, b) => a.localeCompare(b))
    .map((dateString) => ({
      dateString,
      work: entriesByWeek[dateString].filter(({type}) => type === "work"),
      learnings: entriesByWeek[dateString].filter(
        ({type}) => type === "learnings"
      ),
      thoughts: entriesByWeek[dateString].filter(
        ({type}) => type === "thoughts"
      ),
    }));
}
