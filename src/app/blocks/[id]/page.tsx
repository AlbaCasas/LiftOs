import { notFound } from "next/navigation";

import { getBlock } from "@/features/blocks/application/get-block";
import { BlockEditorShell } from "@/features/blocks/ui/block-editor-shell";

export const dynamic = "force-dynamic";

export default async function BlockPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const block = await getBlock(id);
  if (!block) {
    notFound();
  }

  return <BlockEditorShell block={block} />;
}
