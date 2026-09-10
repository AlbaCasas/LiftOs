import { z } from "zod";

import { patterns } from "./exercise";

export const newExerciseDraftSchema = z
  .object({
    name: z.string().trim().min(1, { error: "required" }),
    pattern: z.enum(patterns, { error: "required" }),
    isMeetLift: z.boolean(),
  })
  .transform((draft) => ({
    name: draft.name,
    pattern: draft.pattern,
    isMeetLift: draft.pattern === "other" ? false : draft.isMeetLift,
  }));
