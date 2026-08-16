import { AthletesPage } from "@/features/athletes/athletes-page";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = params.q;
  const query = typeof raw === "string" ? raw : "";

  return <AthletesPage key={query} query={query} />;
}
