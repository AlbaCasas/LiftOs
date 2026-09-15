import { useTranslations } from "next-intl";

import type { BlockAthleteOption, TrainingBlock } from "../domain/block";
import { BlockCreateDialog } from "./block-create-dialog";
import { BlockTable } from "./block-table";

export const BlockList = ({
  blocks,
  athletes,
}: {
  blocks: TrainingBlock[];
  athletes: BlockAthleteOption[];
}) => {
  const t = useTranslations("Blocks");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("pageTitle")}
          </h1>
          <span className="text-sm text-muted-foreground">{blocks.length}</span>
        </div>
        <BlockCreateDialog athletes={athletes} />
      </div>
      <BlockTable blocks={blocks} />
    </div>
  );
};
