import { z } from "zod";

import { patterns } from "./exercise";

export const exerciseDraftSchema = z
  .object({
    id: z.string().min(1, { error: "required" }),
    name: z.string().trim().min(1, { error: "required" }),
    pattern: z.enum(patterns, { error: "required" }),
    isMeetLift: z.enum(["true", "false"]),
  })
  .transform((draft) => ({
    id: draft.id,
    name: draft.name,
    pattern: draft.pattern,
    isMeetLift: draft.pattern === "other" ? false : draft.isMeetLift === "true",
  }));
