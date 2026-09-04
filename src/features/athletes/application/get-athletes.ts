import { requireCoachId } from "@/features/auth/application/require-coach";
import { withAvatar } from "../domain/athlete-avatar";
import { athleteRepository } from "../infrastructure/postgres-athletes";

export const getAthletes = async (repository = athleteRepository) => {
  const coachId = await requireCoachId();
  const athletes = await repository.findAll(coachId);
  return athletes.map(withAvatar);
};
