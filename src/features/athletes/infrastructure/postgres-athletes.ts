import { eq } from "drizzle-orm";
import type { Athlete } from "../domain/athlete";
import type { AthleteRepository } from "../domain/athlete-repository";
import { db } from "./db";
import { mockAthletes } from "./mock-athletes";
import { athletes } from "./schema";

const toAthlete = (row: typeof athletes.$inferSelect): Athlete =>
  row as Athlete;

export const postgresAthleteRepository: AthleteRepository = {
  async findAll() {
    const existing = await db.select().from(athletes);
    if (existing.length === 0) {
      await db.insert(athletes).values(mockAthletes);
      return mockAthletes;
    }
    return existing.map(toAthlete);
  },
  async findById(id: string) {
    const existing = await db
      .select()
      .from(athletes)
      .where(eq(athletes.id, id));
    if (existing.length === 0) {
      return undefined;
    }
    return toAthlete(existing[0]);
  },
};
