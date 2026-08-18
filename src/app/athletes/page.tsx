import { AthleteTable } from "@/features/athletes/components/athlete-table";
import { mockAthletes } from "@/features/athletes/mock-athletes";
import { useTranslations } from "next-intl";

export default function AthletesPage() {
  const t = useTranslations("Athletes");
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{t("pageTitle")}</h1>
      <AthleteTable athletes={mockAthletes} />
    </main>
  );
}
