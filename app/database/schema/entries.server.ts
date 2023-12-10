import { z } from "zod";

export let insertSchema = z.object({
  date: z.date(),
  type: z.string(),
  text: z.string(),
});

export type InsertEntryType = z.infer<typeof insertSchema>;

export let updateSchema = z.object({
  id: z.number(),
  date: z.date().optional(),
  type: z.string().optional(),
  text: z.string().optional(),
});

export type UpdateEntryType = z.infer<typeof updateSchema>;
