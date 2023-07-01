import {z} from "zod";

export const InputSchema = z.object({
  date: z.string().optional().nullable(),
  text: z.string().min(1).max(1000),
  types: z.object({
    // Types
    learnings: z.boolean(),
    work: z.boolean(),
    thoughts: z.boolean(),
    // Types
  }),
});

export type Input = z.infer<typeof InputSchema>;
export type Type = keyof Input["types"];
