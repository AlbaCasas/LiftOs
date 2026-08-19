import type { Athlete } from "../domain/athlete";
import type { AthleteRepository } from "../domain/athlete-repository";
import { db } from "./db";
import { mockAthletes } from "./mock-athletes";
import { athletes } from "./schema";

function toAthlete(row: typeof athletes.$inferSelect): Athlete {
  const base = {
    id: row.id,
    name: row.name,
    ageCategory: row.ageCategory as Athlete["ageCategory"],
    squat1rm: row.squat1rm,
    bench1rm: row.bench1rm,
    deadlift1rm: row.deadlift1rm,
  };

  if (row.gender === "female") {
    return {
      ...base,
      gender: "female",
      weightClass: row.weightClass as Extract<
        Athlete,
        { gender: "female" }
      >["weightClass"],
    };
  }

  return {
    ...base,
    gender: "male",
    weightClass: row.weightClass as Extract<
      Athlete,
      { gender: "male" }
    >["weightClass"],
  };
}

export const postgresAthleteRepository: AthleteRepository = {
  async findAll() {
    const existing = await db.select().from(athletes);

    if (existing.length === 0) {
      await db.insert(athletes).values(mockAthletes);
      return mockAthletes;
    }

    return existing.map(toAthlete);
  },
};
