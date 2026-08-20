import type { Athlete } from "./athlete";

export interface AthleteRepository {
  findAll(): Promise<Athlete[]>;
  findById(id: string): Promise<Athlete | undefined>;
}
