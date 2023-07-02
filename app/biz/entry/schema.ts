import {z} from "zod";

export const InputSchema = z.object({
  date: z.string(),
  text: z.string().min(1).max(1000),
  type: z.string(),
});

export type Input = z.infer<typeof InputSchema>;
export type Type = Input["type"];
