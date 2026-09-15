import { getAthletes } from "@/features/athletes/application/get-athletes";
import { getBlocks } from "@/features/blocks/application/get-blocks";
import { BlockList } from "@/features/blocks/ui/block-list";

export const dynamic = "force-dynamic";

export default async function BlocksPage() {
  const [blocks, athletes] = await Promise.all([getBlocks(), getAthletes()]);

  return (
    <BlockList
      blocks={blocks}
      athletes={athletes.map((athlete) => ({
        id: athlete.id,
        name: athlete.name,
      }))}
    />
  );
}
