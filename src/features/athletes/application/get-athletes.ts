import { postgresAthleteRepository } from "../infrastructure/postgres-athletes";

export const getAthletes = async (repository = postgresAthleteRepository) => {
  return await repository.findAll();
};
