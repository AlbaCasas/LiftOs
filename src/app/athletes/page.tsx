import { AthleteTable } from "@/features/athletes/ui/athlete-table";
import { getTranslations } from "next-intl/server";
import { getAthletes } from "@/features/athletes/application/get-athletes";
import { inMemoryAthleteRepository } from "@/features/athletes/infrastructure/athletes";

export default async function AthletesPage() {
  const [athletes, t] = await Promise.all([
    getAthletes(inMemoryAthleteRepository),
    getTranslations("Athletes"),
  ]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{t("pageTitle")}</h1>
      <AthleteTable athletes={athletes} />
    </main>
  );
}
