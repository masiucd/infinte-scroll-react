import {db} from "~/utils/prisma.server";

export type EntryInsertRecord = {
  text: string;
  type: "learnings" | "work" | "thoughts";
  createdAt?: Date;
};

export async function insertEntry(input: EntryInsertRecord) {
  return await db.entry.create({
    data: {
      ...input,
    },
  });
}
