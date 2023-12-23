import { format, startOfWeek } from "date-fns";
import { db } from "~/database/db.server";

const MONDAY = 1;
export async function getGroupedEntries() {
  let entries = await db.entry.findMany({
    orderBy: { date: "desc" },
  });
  return entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    let start = startOfWeek(entry.date, { weekStartsOn: MONDAY });
    let dateString = format(start, "yyyy-MM-dd");
    acc[dateString] ||= [];
    acc[dateString].push(entry);
    return acc;
  }, {});
}
