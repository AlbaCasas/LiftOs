import { requireCoachId } from "@/features/auth/application/require-coach";
import { athleteRepository } from "../infrastructure/postgres-athletes";

export const getAthlete = async (
  id: string,
  repository = athleteRepository,
) => {
  const coachId = await requireCoachId();
  return await repository.findById(id, coachId);
};
