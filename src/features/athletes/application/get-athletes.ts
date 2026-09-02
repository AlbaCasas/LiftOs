import { withAvatar } from "../domain/athlete-avatar";
import { postgresAthleteRepository } from "../infrastructure/postgres-athletes";

export const getAthletes = async (repository = postgresAthleteRepository) => {
  const athletes = await repository.findAll();
  return athletes.map(withAvatar);
};
