import { requireCoachId } from "@/features/auth/application/require-coach";
import { blockRepository } from "../infrastructure/postgres-blocks";

export const getBlock = async (id: string, repository = blockRepository) => {
  const coachId = await requireCoachId();
  return repository.findById(id, coachId);
};
