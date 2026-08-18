import { AthleteTable } from "@/features/athletes/ui/athlete-table";
import { inMemoryAthleteRepository } from "@/features/athletes/infrastructure/athletes";
import { getAthletes } from "@/features/athletes/application/get-athletes";
import { getTranslations } from "next-intl/server";

export default async function AthletesPage() {
  const t = await getTranslations("Athletes");
  const athletes = await getAthletes(inMemoryAthleteRepository);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{t("pageTitle")}</h1>
      <AthleteTable athletes={athletes} />
    </main>
  );
}
