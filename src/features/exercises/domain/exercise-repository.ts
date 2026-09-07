import type { Exercise } from "./exercise";

export interface ExerciseRepository {
  findAll(): Promise<Exercise[]>;
  findById(id: string): Promise<Exercise | undefined>;
  seedIfEmpty(exercises: Exercise[]): Promise<void>;
  update(exercise: Exercise): Promise<Exercise>;
  delete(id: string): Promise<void>;
}
