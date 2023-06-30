import {db} from "~/utils/prisma.server";

type EntryInsertRecord = {
  text: string;
  type: string;
  createdAt: Date;
};

export async function createEntry(input: EntryInsertRecord) {
  await db.entry.create({
    data: {
      ...input,
    },
  });
}
