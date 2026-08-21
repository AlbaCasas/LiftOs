import { postgresAthleteRepository } from "../infrastructure/postgres-athletes";

export const getAthlete = async (
  id: string,
  repository = postgresAthleteRepository,
) => {
  return await repository.findById(id);
};
