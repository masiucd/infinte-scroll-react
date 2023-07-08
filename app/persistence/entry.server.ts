import type {Entry} from "@prisma/client";

import {db} from "~/utils/prisma.server";

type Input = Omit<Entry, "id" | "updatedAt">;
export async function insertEntry(input: Input) {
  return await db.entry.create({
    data: {
      ...input,
    },
  });
}

export async function getEntries(take = 10, skip = 0) {
  return await db.entry.findMany({
    take,
    skip,
    select: {
      id: true,
      text: true,
      type: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
