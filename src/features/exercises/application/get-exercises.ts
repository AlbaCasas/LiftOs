import { requireCoachId } from "@/features/auth/application/require-coach";
import { seedExercises } from "../domain/seed-exercises";
import { exerciseRepository } from "../infrastructure/postgres-exercises";

export const getExercises = async (repository = exerciseRepository) => {
  await requireCoachId();
  await repository.seedIfEmpty(seedExercises);
  return repository.findAll();
};
