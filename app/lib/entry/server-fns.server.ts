import {type Entry} from "@prisma/client";
import {format, parseISO, startOfWeek} from "date-fns";

function groupEntriesByWeek(entries: Entry[]) {
  let entryList = entries.map((e) => ({
    ...e,
    date: e.date.toISOString().substring(0, 10),
  }));
  return entryList.reduce<Record<string, typeof entryList>>((obj, item) => {
    let sunday = startOfWeek(parseISO(item.date));
    let sundayString = format(sunday, "yyyy-MM-dd");
    if (!obj[sundayString]) {
      obj[sundayString] = [];
    }
    obj[sundayString].push(item);
    return obj;
  }, {});
}

export function transformEntries(entries: Entry[]) {
  let entriesByWeek = groupEntriesByWeek(entries);
  return [...Object.keys(entriesByWeek)]
    .sort((a, b) => b.localeCompare(a))
    .map((week) => ({
      week,
      work: entriesByWeek[week].filter(({type}) => type === "work"),
      learnings: entriesByWeek[week].filter(({type}) => type === "learnings"),
      thoughts: entriesByWeek[week].filter(({type}) => type === "thoughts"),
    }));
}
