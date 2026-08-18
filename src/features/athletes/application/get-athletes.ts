import type { Athlete } from "../domain/athlete";
import type { AthleteRepository } from "../domain/athlete-repository";

export const getAthletes = async (repository: AthleteRepository) => {
  return new Promise<Athlete[]>((resolve) => {
    setTimeout(() => {
      resolve(repository.findAll());
    }, 1000);
  });
};
