import {z} from "zod";

export const LoginErrorResultSchema = z.object({
  status: z.number(),
  body: z.object({
    message: z.string(),
  }),
});

export type LoginErrorResult = z.TypeOf<typeof LoginErrorResultSchema>;
