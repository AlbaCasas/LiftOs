import { getTranslations } from "next-intl/server";

import { getExercises } from "@/features/exercises/application/get-exercises";
import { ExercisesTable } from "@/features/exercises/ui/exercises-table";

export const dynamic = "force-dynamic";

export default async function ExercisesPage() {
  const [exercises, t] = await Promise.all([
    getExercises(),
    getTranslations("Exercises"),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("pageTitle")}</h1>
      <ExercisesTable exercises={exercises} />
    </div>
  );
}
