import { db } from "../db.server";
import type {
  InsertEntryType,
  UpdateEntryType,
} from "../schema/entries.server";

export async function getEntries() {
  let entries = await db.entry.findMany();
  return entries;
}

export async function insertEntry(newEntry: InsertEntryType) {
  return db.entry.create({
    data: newEntry,
  });
}

export async function getEntryById(id: number) {
  return await db.entry.findUnique({
    where: { id },
  });
}

export async function updateEntry(entry: UpdateEntryType) {
  return await db.entry.update({
    where: { id: entry.id },
    data: {
      text: entry.text,
      type: entry.type,
      date: entry.date,
    },
  });
}

export async function deleteEntry(id: number) {
  return await db.entry.delete({
    where: { id },
  });
}
