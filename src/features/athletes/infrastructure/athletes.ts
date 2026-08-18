import type { AthleteRepository } from "../domain/athlete-repository";
import { mockAthletes } from "./mock-athletes";

export const inMemoryAthleteRepository: AthleteRepository = {
  findAll: async () => mockAthletes,
};
