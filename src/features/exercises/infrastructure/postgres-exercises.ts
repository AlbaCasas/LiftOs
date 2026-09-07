import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import type { Exercise } from "../domain/exercise";
import type { ExerciseRepository } from "../domain/exercise-repository";
import { exercises } from "./schema";

const toExercise = (row: typeof exercises.$inferSelect): Exercise =>
  row as Exercise;

export const exerciseRepository: ExerciseRepository = {
  async findAll() {
    const rows = await db.select().from(exercises).orderBy(asc(exercises.name));
    return rows.map(toExercise);
  },
  async findById(id) {
    const [row] = await db.select().from(exercises).where(eq(exercises.id, id));
    return row ? toExercise(row) : undefined;
  },
  async seedIfEmpty(defaults) {
    const [existing] = await db.select({ id: exercises.id }).from(exercises).limit(1);
    if (existing) return;
    await db.insert(exercises).values(defaults);
  },
  async update(exercise) {
    await db
      .update(exercises)
      .set({
        name: exercise.name,
        pattern: exercise.pattern,
        isMeetLift: exercise.isMeetLift,
      })
      .where(eq(exercises.id, exercise.id));
    return exercise;
  },
  async delete(id) {
    await db.delete(exercises).where(eq(exercises.id, id));
  },
};
