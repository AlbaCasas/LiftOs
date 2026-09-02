import { and, eq } from "drizzle-orm";
import type { Athlete } from "../domain/athlete";
import type { AthleteRepository } from "../domain/athlete-repository";
import { db } from "@/lib/db";
import { athletes } from "./schema";

const toAthlete = (row: typeof athletes.$inferSelect): Athlete =>
  row as Athlete;

export const postgresAthleteRepository: AthleteRepository = {
  async findAll(coachId) {
    const rows = await db
      .select()
      .from(athletes)
      .where(eq(athletes.coachId, coachId));
    return rows.map(toAthlete);
  },
  async findById(id, coachId) {
    const [row] = await db
      .select()
      .from(athletes)
      .where(and(eq(athletes.id, id), eq(athletes.coachId, coachId)));
    return row ? toAthlete(row) : undefined;
  },
  async create(athlete) {
    await db.insert(athletes).values(athlete);
    return athlete;
  },
};
