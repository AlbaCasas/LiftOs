import { athleteRepository } from "@/features/athletes/infrastructure/postgres-athletes";
import { requireCoachId } from "@/features/auth/application/require-coach";
import { toBlockAthleteOption } from "../domain/block";

export const getBlockAthleteOptions = async (
  repository = athleteRepository,
) => {
  const coachId = await requireCoachId();
  const athletes = await repository.findAll(coachId);
  return athletes.map(toBlockAthleteOption);
};
