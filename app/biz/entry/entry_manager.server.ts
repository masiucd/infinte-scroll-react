import {insertEntry} from "~/persistence/entry.server";

import {type Input, InputSchema, type Type} from "./schema";

function getType(types: Input["types"]): Type {
  if (types.learnings) return "learnings";
  if (types.work) return "work";
  if (types.thoughts) return "thoughts";
  throw new Error("No type selected");
}

export const createEntry = async (input: Input) => {
  const validatedInput = InputSchema.parse(input);
  console.log("validateInput", validatedInput);

  await insertEntry({
    text: validatedInput.text,
    type: getType(validatedInput.types),
    createdAt: input.date ? new Date(input.date) : undefined,
  });
};
