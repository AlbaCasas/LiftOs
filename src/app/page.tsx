import { getAthletes } from "@/features/athletes/application/get-athletes";
import { inMemoryAthleteRepository } from "@/features/athletes/infrastructure/athletes";
import { AthleteTable } from "@/features/athletes/ui/athlete-table";

export default async function Home() {
  const athletes = await getAthletes(inMemoryAthleteRepository);
  return (
    <main className="p-6">
      <AthleteTable athletes={athletes} />
    </main>
  );
}
