import { eq } from "drizzle-orm";
import type { Athlete } from "../domain/athlete";
import type { AthleteRepository } from "../domain/athlete-repository";
import { db } from "./db";
import { athletes } from "./schema";

const toAthlete = (row: typeof athletes.$inferSelect): Athlete =>
  row as Athlete;

export const postgresAthleteRepository: AthleteRepository = {
  async findAll() {
    const rows = await db.select().from(athletes);
    return rows.map(toAthlete);
  },
  async findById(id: string) {
    const [row] = await db.select().from(athletes).where(eq(athletes.id, id));
    return row ? toAthlete(row) : undefined;
  },
  async create(athlete) {
    await db.insert(athletes).values(athlete);
    return athlete;
  },
};
