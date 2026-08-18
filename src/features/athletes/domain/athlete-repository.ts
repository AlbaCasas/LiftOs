import type { Athlete } from "./athlete";

export interface AthleteRepository {
  findAll(): Promise<Athlete[]>;
}
