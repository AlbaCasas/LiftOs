import { getBlockAthleteOptions } from "@/features/blocks/application/get-block-athlete-options";
import { getBlocks } from "@/features/blocks/application/get-blocks";
import { BlockList } from "@/features/blocks/ui/block-list";

export const dynamic = "force-dynamic";

export default async function BlocksPage() {
  const [blocks, athletes] = await Promise.all([
    getBlocks(),
    getBlockAthleteOptions(),
  ]);

  return <BlockList blocks={blocks} athletes={athletes} />;
}
