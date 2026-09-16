import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import type { TrainingBlock } from "../domain/block";

export const BlockEditorShell = ({ block }: { block: TrainingBlock }) => {
  const t = useTranslations("Blocks");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button variant="ghost" size="sm" className="-ml-2 mb-4" asChild>
          <Link href="/blocks" prefetch={false}>
            <ArrowLeft />
            {t("backToList")}
          </Link>
        </Button>
        <Heading>{block.name}</Heading>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
        <p className="font-medium">{t("editor.emptyTitle")}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("editor.emptyDescription")}
        </p>
      </div>
    </div>
  );
};
