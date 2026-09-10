import { getExercises } from "@/features/exercises/application/get-exercises";
import { ExercisesLibrary } from "@/features/exercises/ui/exercises-library";

export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  const exercises = await getExercises();

  return <ExercisesLibrary exercises={exercises} />;
}
