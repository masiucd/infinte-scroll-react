import { db } from "../db.server";
import type { InsertEntryType } from "../schema/entries.server";

export async function getEntries() {
  let entries = await db.entry.findMany();
  return entries;
}

export async function insertEntry(newEntry: InsertEntryType) {
  return db.entry.create({
    data: newEntry,
  });
}
