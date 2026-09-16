import { z } from "zod";

export const newBlockDraftSchema = z.object({
  name: z.string().trim().min(1, { error: "required" }),
  athleteId: z.string().trim().min(1, { error: "required" }),
});
