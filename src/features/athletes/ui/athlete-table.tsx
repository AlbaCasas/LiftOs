import Link from "next/link";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Athlete } from "@/features/athletes/domain/athlete";
import { totalKg } from "@/features/athletes/domain/total-kg";
import { cn } from "@/lib/cn";
import { AthleteAvatar } from "./athlete-avatar";

const liftColumns = [
  {
    key: "sq",
    getValue: (athlete: Athlete) => athlete.squat1rm,
    emphasized: false,
  },
  {
    key: "bp",
    getValue: (athlete: Athlete) => athlete.bench1rm,
    emphasized: false,
  },
  {
    key: "dl",
    getValue: (athlete: Athlete) => athlete.deadlift1rm,
    emphasized: false,
  },
  { key: "total", getValue: totalKg, emphasized: true },
] as const;

const EmptyRoster = () => {
  const t = useTranslations("Athletes");

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">
      <p className="font-medium">{t("empty.title")}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("empty.description")}
      </p>
    </div>
  );
};

const KgCell = ({
  value,
  emphasized = false,
}: {
  value: number;
  emphasized?: boolean;
}) => (
  <TableCell
    className={cn(
      "py-3 text-right tabular-nums",
      emphasized && "pr-6 font-medium",
    )}
  >
    {value}
  </TableCell>
);

const AthleteTableRow = ({ athlete }: { athlete: Athlete }) => {
  const t = useTranslations("Athletes");

  return (
    <TableRow className="relative">
      <TableCell className="py-3 pl-4">
        <Link
          href={`/athletes/${athlete.id}`}
          className="flex items-center gap-3 after:absolute after:inset-0"
        >
          <AthleteAvatar id={athlete.id} name={athlete.name} />
          <span className="min-w-0">
            <span className="block font-medium">{athlete.name}</span>
            <span className="block text-xs text-muted-foreground">
              {t(`genderValue.${athlete.gender}`)} ·{" "}
              {t(`ageCategoryValue.${athlete.ageCategory}`)}
            </span>
          </span>
        </Link>
      </TableCell>
      <TableCell className="py-3">
        <Badge variant="outline">{athlete.weightClass}</Badge>
      </TableCell>
      {liftColumns.map((column) => (
        <KgCell
          key={column.key}
          value={column.getValue(athlete)}
          emphasized={column.emphasized}
        />
      ))}
    </TableRow>
  );
};

export const AthleteTable = ({ athletes }: { athletes: Athlete[] }) => {
  const t = useTranslations("Athletes");

  if (athletes.length === 0) return <EmptyRoster />;

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4 text-muted-foreground">
              {t("table.name")}
            </TableHead>
            <TableHead className="text-muted-foreground">
              {t("table.class")}
            </TableHead>
            {liftColumns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  "text-right text-muted-foreground",
                  column.emphasized && "pr-6",
                )}
              >
                {t(`table.${column.key}`)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {athletes.map((athlete) => (
            <AthleteTableRow key={athlete.id} athlete={athlete} />
          ))}
        </TableBody>
      </Table>
      <p className="border-t px-4 py-2.5 text-xs text-muted-foreground">
        {t("table.count", { count: athletes.length })}
      </p>
    </div>
  );
};
