import { getTranslations } from "next-intl/server";

import { getAthletes } from "@/features/athletes/application/get-athletes";
import { AthleteSheet } from "@/features/athletes/ui/athlete-sheet";
import { AthleteTable } from "@/features/athletes/ui/athlete-table";

export const dynamic = "force-dynamic";

export default async function AthletesPage() {
  const [athletes, t] = await Promise.all([
    getAthletes(),
    getTranslations("Athletes"),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{t("pageTitle")}</h1>
        <AthleteSheet />
      </div>
      <AthleteTable athletes={athletes} />
    </div>
  );
}
