import {z} from "zod";

export const InputSchema = z.object({
  date: z.string().optional().nullable(),
  text: z.string().min(1).max(1000),
  type: z.enum(["learnings", "work", "thoughts"]),
});

export type Input = z.infer<typeof InputSchema>;
export type Type = Input["type"];
