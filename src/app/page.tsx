import { mockAthletes } from "@/features/athletes/mock-athletes";
import { AthleteTable } from "@/features/athletes/components/athlete-table";

export default async function Home() {
  return (
    <main className="p-6">
      <AthleteTable athletes={mockAthletes} />
    </main>
  );
}
