import { AthleteTable } from "@/features/athletes/ui/athlete-table";
import { getTranslations } from "next-intl/server";
import { getAthletes } from "@/features/athletes/application/get-athletes";
import { AthleteSheet } from "@/features/athletes/ui/athlete-sheet";

export const dynamic = "force-dynamic";

export default async function AthletesPage() {
  const [athletes, t] = await Promise.all([
    getAthletes(),
    getTranslations("Athletes"),
  ]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("pageTitle")}</h1>
        <AthleteSheet />
      </div>
      <AthleteTable athletes={athletes} />
    </>
  );
};
