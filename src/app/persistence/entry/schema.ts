import {z} from "zod";

export const EntrySchema = z.object({
  id: z.number(),
  text: z.string(),
  type: z.enum(["work", "learn", "interesting"]),
  date: z.date().or(z.string()),
  user_id: z.number(),
});

export type Entry = z.infer<typeof EntrySchema>;
