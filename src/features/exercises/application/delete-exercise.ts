"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import { requireCoachId } from "@/features/auth/application/require-coach";
import { exerciseRepository } from "../infrastructure/postgres-exercises";

export const deleteExercise = async (id: string) => {
  await requireCoachId();

  try {
    await exerciseRepository.delete(id);
  } catch {
    const t = await getTranslations("Exercises.form");
    return { ok: false, message: t("failed") };
  }

  revalidatePath("/exercises");
  return { ok: true };
};
