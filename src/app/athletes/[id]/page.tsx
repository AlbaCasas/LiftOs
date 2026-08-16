import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getAthlete } from "@/data/athletes";

export default async function AthletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const athlete = getAthlete(id);

  if (!athlete) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={
        <Link href="/" className="hover:text-ink">
          Athletes
        </Link>
      }
      title={athlete.name}
      description="Programs, volume, and PRs for this athlete come next."
    >
      <p className="text-sm text-secondary">
        {athlete.weightClass || "No class yet"}
      </p>
    </PageShell>
  );
}
