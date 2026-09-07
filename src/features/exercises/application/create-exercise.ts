"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import { requireCoachId } from "@/features/auth/application/require-coach";
import type { NewExerciseDraft } from "../domain/exercise";
import { newExerciseDraftSchema } from "../domain/to-new-exercise";
import { exerciseRepository } from "../infrastructure/postgres-exercises";

export const createExercise = async (draft: NewExerciseDraft) => {
  const parsed = newExerciseDraftSchema.safeParse(draft);
  if (!parsed.success) {
    return { ok: false };
  }

  await requireCoachId();

  try {
    await exerciseRepository.create({
      ...parsed.data,
      id: crypto.randomUUID(),
    });
  } catch {
    const t = await getTranslations("Exercises.form");
    return { ok: false, message: t("failed") };
  }

  revalidatePath("/exercises");
  return { ok: true };
};
