import { getAthlete } from "@/features/athletes/application/get-athlete";
import { postgresAthleteRepository } from "@/features/athletes/infrastructure/postgres-athletes";
import { AthleteDetails } from "@/features/athletes/ui/athlete-details";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AthletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const athlete = await getAthlete(id);
  if (!athlete) {
    notFound();
  }
  return <AthleteDetails athlete={athlete} />;
}
