import { getTranslations } from "next-intl/server";

import { getExercises } from "@/features/exercises/application/get-exercises";
import { ExerciseCreateDialog } from "@/features/exercises/ui/exercise-create-dialog";
import { ExercisesTable } from "@/features/exercises/ui/exercises-table";

export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  const [exercises, t] = await Promise.all([
    getExercises(),
    getTranslations("Exercises"),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{t("pageTitle")}</h1>
          <span className="text-sm text-muted-foreground">{exercises.length}</span>
        </div>
        <ExerciseCreateDialog />
      </div>
      <ExercisesTable exercises={exercises} />
    </div>
  );
}
