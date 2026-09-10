"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import { requireCoachId } from "@/features/auth/application/require-coach";
import type { ExerciseDraft } from "../domain/exercise";
import { exerciseDraftSchema } from "../domain/to-exercise";
import { exerciseRepository } from "../infrastructure/postgres-exercises";

export const updateExercise = async (draft: ExerciseDraft) => {
  const parsed = exerciseDraftSchema.safeParse(draft);
  if (!parsed.success) {
    return { ok: false };
  }

  await requireCoachId();

  try {
    await exerciseRepository.update(parsed.data);
  } catch {
    const t = await getTranslations("Exercises.form");
    return { ok: false, message: t("failed") };
  }

  revalidatePath("/exercises");
  return { ok: true };
};
