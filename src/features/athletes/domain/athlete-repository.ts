import type { Athlete } from "./athlete";

export interface AthleteRepository {
  findAll(coachId: string): Promise<Athlete[]>;
  findById(id: string, coachId: string): Promise<Athlete | undefined>;
  create(athlete: Athlete): Promise<Athlete>;
}
