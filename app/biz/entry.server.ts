import {add, parseISO} from "date-fns";

import {db} from "~/utils/prisma.server";

export async function deleteEntry(id: number) {
  await db.entry.delete({
    where: {
      id: Number(id),
    },
  });
}

export async function updateEntry({
  id,
  text,
  type,
  date,
}: {
  id: string;
  text: string;
  type: string;
  date: string;
}) {
  await db.entry.update({
    where: {
      id: Number(id),
    },
    data: {
      text,
      type,
      date: add(parseISO(date), {days: 1}),
    },
  });
}
