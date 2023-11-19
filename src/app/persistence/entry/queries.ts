import "server-only";

import sql from "@/db/db";

import {type Entry, EntrySchema} from "./schema";

export async function storeEntry(entry: {
  date: string;
  entryType: string;
  text: string;
  userId: string;
}): Promise<Entry> {
  let rows = await sql`
    INSERT INTO entries (
        text,
        type,
        user_id,
        date
    ) VALUES (
        ${entry.text},
        ${entry.entryType},
        ${entry.userId},
        ${entry.date}
    ) RETURNING *;
  `;
  let newEntry = rows[0];
  return EntrySchema.parse(newEntry);
}

export async function getEntries(form: number = 0, to: number = 10) {
  let rows = await sql`
    SELECT e.id, e.text, e.type, e.date, e.user_id from entries e
    OFFSET ${form} LIMIT ${to};
  `;
  return rows.map((row) => EntrySchema.parse(row));
}
