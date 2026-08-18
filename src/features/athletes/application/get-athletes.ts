import { AthleteRepository } from "../domain/athlete-repository";

export const getAthletes = async (repository: AthleteRepository) => {
  return repository.findAll();
};
