import { z } from "zod";

import {
  ageCategories,
  femaleWeightClasses,
  maleWeightClasses,
} from "./athlete";

const WHOLE_NUMBER_REGEX = /^\d+$/;

const kg = z
  .string()
  .trim()
  .min(1, { error: "required" })
  .pipe(
    z
      .string()
      .regex(WHOLE_NUMBER_REGEX, { error: "notPositive" })
      .transform(Number)
      .refine((value) => value >= 1, { error: "notPositive" }),
  );

const weightClassError = (issue: { input: unknown }) =>
  issue.input === "" ? "required" : "weightClassMismatch";

const athleteClassSchema = z.discriminatedUnion(
  "gender",
  [
    z.object({
      gender: z.literal("female"),
      weightClass: z.enum(femaleWeightClasses, { error: weightClassError }),
    }),
    z.object({
      gender: z.literal("male"),
      weightClass: z.enum(maleWeightClasses, { error: weightClassError }),
    }),
  ],
  { error: "required" },
);

export const newAthleteDraftSchema = z
  .object({
    name: z.string().trim().min(1, { error: "required" }),
    gender: z.string().min(1, { error: "required" }),
    ageCategory: z.string().pipe(z.enum(ageCategories, { error: "required" })),
    weightClass: z.string(),
    squat1rm: kg,
    bench1rm: kg,
    deadlift1rm: kg,
  })
  .pipe(
    z
      .object({
        name: z.string(),
        ageCategory: z.enum(ageCategories),
        squat1rm: z.number(),
        bench1rm: z.number(),
        deadlift1rm: z.number(),
      })
      .and(athleteClassSchema),
  );
