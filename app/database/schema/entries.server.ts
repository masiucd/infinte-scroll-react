import { z } from "zod";

export let insertSchema = z.object({
  date: z.date(),
  type: z.string(),
  text: z.string(),
});

export type InsertEntryType = z.infer<typeof insertSchema>;
