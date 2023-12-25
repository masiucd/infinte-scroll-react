import { getGroupedEntries } from "./entries.server";

let EntryType = Object.freeze({
  work: "work",
  learning: "learning",
  interestingThing: "interesting-thing",
});

export async function getEntries() {
  let groupedEntries = await getGroupedEntries();
  return {
    entries: Object.keys(groupedEntries).map((dateString) => ({
      dateString,
      work: groupedEntries[dateString]
        .filter((entry) => entry.type === EntryType.work)
        .map((entry) => ({
          ...entry,
          date: entry.date.toISOString(),
        })),
      learning: groupedEntries[dateString]
        .filter((entry) => entry.type === EntryType.learning)
        .map((entry) => ({
          ...entry,
          date: entry.date.toISOString(),
        })),
      interestingThing: groupedEntries[dateString]
        .filter((entry) => entry.type === EntryType.interestingThing)
        .map((entry) => ({
          ...entry,
          date: entry.date.toISOString(),
        })),
    })),
  };
}
