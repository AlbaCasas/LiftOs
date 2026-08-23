"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import type { NewAthleteDraft } from "../domain/athlete";
import { toNewAthlete } from "../domain/to-new-athlete";
import { postgresAthleteRepository } from "../infrastructure/postgres-athletes";

export const createAthlete = async (draft: NewAthleteDraft) => {
  const athlete = toNewAthlete(draft);
  if (!athlete) {
    return { ok: false as const };
  }

  try {
    await postgresAthleteRepository.create({
      ...athlete,
      id: crypto.randomUUID(),
    });
  } catch {
    const t = await getTranslations("Athletes.form");
    return { ok: false as const, message: t("failed") };
  }

  revalidatePath("/athletes");
  return { ok: true as const };
};
