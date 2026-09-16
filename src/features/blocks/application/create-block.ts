"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

import { getAthlete } from "@/features/athletes/application/get-athlete";
import type { NewBlockDraft } from "../domain/block";
import { newBlockDraftSchema } from "../domain/to-new-block";
import { blockRepository } from "../infrastructure/postgres-blocks";

export const createBlock = async (draft: NewBlockDraft) => {
  const parsed = newBlockDraftSchema.safeParse(draft);
  if (!parsed.success) {
    return { ok: false };
  }

  const athlete = await getAthlete(parsed.data.athleteId);
  if (!athlete) {
    const t = await getTranslations("Blocks.form");
    return { ok: false, message: t("failed") };
  }

  const id = crypto.randomUUID();

  try {
    await blockRepository.create({
      id,
      name: parsed.data.name,
      coachId: athlete.coachId,
      athleteId: athlete.id,
      updatedAt: new Date(),
    });
  } catch {
    const t = await getTranslations("Blocks.form");
    return { ok: false, message: t("failed") };
  }

  revalidatePath("/blocks");
  return { ok: true };
};
