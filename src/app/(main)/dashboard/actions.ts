"use server";

import {revalidatePath} from "next/cache";
import {z} from "zod";

import {storeEntry} from "@/app/persistence/entry/queries";

const CreateEntrySchema = z.object({
  date: z.string(),
  entryType: z.string(),
  text: z.string(),
  userId: z.string(),
});

export async function action(prevState: any, formData: FormData) {
  let date = formData.get("date");
  let entryType = formData.get("entry-type");
  let text = formData.get("text");
  let userId = formData.get("userId");

  let parsed = CreateEntrySchema.parse({
    date,
    entryType,
    text,
    userId,
  });

  // if (typeof date !== "string") {
  //   throw new Error("date is not a string");
  // }
  // if (typeof entryType !== "string") {
  //   throw new Error("entryType is not a string");
  // }
  // if (typeof text !== "string") {
  //   throw new Error("text is not a string");
  // }
  // if (typeof userId !== "string") {
  //   throw new Error("userId is not a string");
  // }

  try {
    await storeEntry(parsed);
    revalidatePath("/dashboard");
  } catch (error) {
    return {
      message: "Error storing entry",
    };
  }
}
