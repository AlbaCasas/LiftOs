import { getAthletes } from "@/features/athletes/application/get-athletes";
import { AthleteTable } from "@/features/athletes/ui/athlete-table";
import { postgresAthleteRepository } from "@/features/athletes/infrastructure/postgres-athletes";

export const dynamic = "force-dynamic";

export default async function Home() {
  const athletes = await getAthletes(postgresAthleteRepository);
  return (
    <main className="p-6">
      <AthleteTable athletes={athletes} />
    </main>
  );
}
