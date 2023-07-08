// import {z} from "zod";

// export const WorkSchema = z.object({
//   id: z.number(),
//   text: z.string(),
//   type: z.literal("work"),
//   date: z.string(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// export const LearningsSchema = z.object({
//   id: z.number(),
//   text: z.string(),
//   type: z.literal("learnings"),
//   date: z.string(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// export const ThoughtsSchema = z.object({
//   id: z.number(),
//   text: z.string(),
//   type: z.literal("thoughts"),
//   date: z.string(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// export const WeekSchema = z.object({
//   dateString: z.string(),
//   work: z.array(WorkSchema),
//   learnings: z.array(LearningsSchema),
//   thoughts: z.array(ThoughtsSchema),
// });

// export const EntrySchema = z.object({
//   id: z.number(),
//   text: z.string(),
//   type: z.union([
//     z.literal("work"),
//     z.literal("learnings"),
//     z.literal("thoughts"),
//   ]),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// export const WeekSchemaArray = z.array(WeekSchema);

// export type Week = z.infer<typeof WeekSchema>;
// export type Work = z.infer<typeof WorkSchema>;
// export type Learnings = z.infer<typeof LearningsSchema>;
// export type Thoughts = z.infer<typeof ThoughtsSchema>;
// export type Entry = z.infer<typeof EntrySchema>;
// export type WeekArray = z.infer<typeof WeekSchemaArray>;
