import { requireCoachId } from "@/features/auth/application/require-coach";
import { blockRepository } from "../infrastructure/postgres-blocks";

export const getBlocks = async (repository = blockRepository) => {
  const coachId = await requireCoachId();
  return repository.findAll(coachId);
};
