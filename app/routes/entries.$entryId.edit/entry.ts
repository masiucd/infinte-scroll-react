import { getEntryById } from "~/database/queries/entries.server";

export async function getEntry(request: Request, entryId: string) {
  let id = parseInt(entryId, 10);
  let entry = await getEntryById(id);
  return entry;
}
