import { getExercises } from "@/features/exercises/application/get-exercises";
import { patternFilterFromParam } from "@/features/exercises/domain/exercise";
import { ExercisesLibrary } from "@/features/exercises/ui/exercises-library";

export const dynamic = "force-dynamic";

export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: Promise<{ pattern?: string | string[] }>;
}) {
  const [{ pattern }, exercises] = await Promise.all([
    searchParams,
    getExercises(),
  ]);

  return (
    <ExercisesLibrary
      exercises={exercises}
      patternFilter={patternFilterFromParam(pattern)}
    />
  );
}
