"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import { requireCoachId } from "@/features/auth/application/require-coach";
import type { NewAthleteDraft } from "../domain/athlete";
import { newAthleteDraftSchema } from "../domain/to-new-athlete";
import { postgresAthleteRepository } from "../infrastructure/postgres-athletes";

export const createAthlete = async (draft: NewAthleteDraft) => {
  const parsed = newAthleteDraftSchema.safeParse(draft);
  if (!parsed.success) {
    return { ok: false };
  }

  const coachId = await requireCoachId();

  try {
    await postgresAthleteRepository.create({
      ...parsed.data,
      id: crypto.randomUUID(),
      coachId,
    });
  } catch {
    const t = await getTranslations("Athletes.form");
    return { ok: false, message: t("failed") };
  }

  revalidatePath("/athletes");
  return { ok: true };
};
