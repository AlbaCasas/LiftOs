import { requireCoachId } from "@/features/auth/application/require-coach";
import { postgresAthleteRepository } from "../infrastructure/postgres-athletes";

export const getAthlete = async (
  id: string,
  repository = postgresAthleteRepository,
) => {
  const coachId = await requireCoachId();
  return await repository.findById(id, coachId);
};
