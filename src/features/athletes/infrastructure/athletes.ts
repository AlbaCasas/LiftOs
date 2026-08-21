import type { AthleteRepository } from "../domain/athlete-repository";
import { mockAthletes } from "./mock-athletes";

export const inMemoryAthleteRepository: AthleteRepository = {
  findAll: async () => mockAthletes,
  findById: async (id: string) =>
    mockAthletes.find((athlete) => athlete.id === id),
};
