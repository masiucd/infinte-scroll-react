import { updateEntry } from "~/database/queries/entries.server";
import { updateSchema } from "~/database/schema/entries.server";
import { sleep } from "~/utils/sleep";

export async function update(
  entryId: string,
  body: {
    date: string;
    type: string;
    text: string;
  },
) {
  let { date, type, text } = body;
  let entry = updateSchema.parse({
    id: parseInt(entryId, 10),
    date: new Date(date),
    type,
    text,
  });
  // TODO to test when connection is slow
  await sleep();
  await updateEntry(entry);
}
