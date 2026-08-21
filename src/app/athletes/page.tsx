import { AthleteTable } from "@/features/athletes/ui/athlete-table";
import { getTranslations } from "next-intl/server";
import { getAthletes } from "@/features/athletes/application/get-athletes";

export const dynamic = "force-dynamic";

export default async function AthletesPage() {
  const [athletes, t] = await Promise.all([
    getAthletes(),
    getTranslations("Athletes"),
  ]);

  return (
    <>
      <h1 className="text-2xl font-bold">{t("pageTitle")}</h1>
      <AthleteTable athletes={athletes} />
    </>
  );
}
