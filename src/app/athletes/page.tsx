import { getAthletes } from "@/features/athletes/application/get-athletes";
import { AthleteList } from "@/features/athletes/ui/athlete-list";

export const dynamic = "force-dynamic";

export default async function AthletesPage() {
  const athletes = await getAthletes();

  return <AthleteList athletes={athletes} />;
}
