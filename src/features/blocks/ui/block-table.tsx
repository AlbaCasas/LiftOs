import Link from "next/link";
import { useFormatter, useTranslations } from "next-intl";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TrainingBlock } from "../domain/block";

const EmptyList = () => {
  const t = useTranslations("Blocks");

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
      <p className="font-medium">{t("empty.title")}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("empty.description")}
      </p>
    </div>
  );
};

const BlockTableRow = ({ block }: { block: TrainingBlock }) => {
  const t = useTranslations("Blocks");
  const format = useFormatter();

  return (
    <TableRow className="relative">
      <TableCell className="py-3 pl-4 font-medium">
        <Link
          href={`/blocks/${block.id}`}
          prefetch={false}
          className="after:absolute after:inset-0"
        >
          {block.name}
        </Link>
      </TableCell>
      <TableCell className="py-3 text-muted-foreground">
        {block.athleteName ?? t("unassigned")}
      </TableCell>
      <TableCell className="py-3 pr-4 text-muted-foreground">
        {format.dateTime(block.updatedAt, { dateStyle: "medium" })}
      </TableCell>
    </TableRow>
  );
};

export const BlockTable = ({ blocks }: { blocks: TrainingBlock[] }) => {
  const t = useTranslations("Blocks");

  if (blocks.length === 0) return <EmptyList />;

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4 text-muted-foreground">
              {t("table.name")}
            </TableHead>
            <TableHead className="text-muted-foreground">
              {t("table.athlete")}
            </TableHead>
            <TableHead className="pr-4 text-muted-foreground">
              {t("table.updated")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blocks.map((block) => (
            <BlockTableRow key={block.id} block={block} />
          ))}
        </TableBody>
      </Table>
      <p className="border-t px-4 py-2.5 text-xs text-muted-foreground">
        {t("table.count", { count: blocks.length })}
      </p>
    </div>
  );
};
