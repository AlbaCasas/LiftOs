import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { totalKg } from "@/features/athletes/domain/total-kg";
import { cn } from "@/lib/cn";
import type { Athlete } from "../domain/athlete";

const liftStats = [
  {
    labelKey: "table.squat1rm",
    getValue: (athlete: Athlete) => athlete.squat1rm,
    emphasized: false,
  },
  {
    labelKey: "table.bench1rm",
    getValue: (athlete: Athlete) => athlete.bench1rm,
    emphasized: false,
  },
  {
    labelKey: "table.deadlift1rm",
    getValue: (athlete: Athlete) => athlete.deadlift1rm,
    emphasized: false,
  },
  {
    labelKey: "table.totalKg",
    getValue: totalKg,
    emphasized: true,
  },
] as const;

const LiftStat = ({
  label,
  value,
  unit,
  emphasized = false,
}: {
  label: string;
  value: number;
  unit: string;
  emphasized?: boolean;
}) => (
  <li
    className={cn(
      "rounded-xl px-4 py-5",
      emphasized ? "bg-primary text-primary-foreground" : "bg-muted/60",
    )}
  >
    <p
      className={cn(
        "text-xs font-medium tracking-wide uppercase",
        emphasized ? "opacity-70" : "text-muted-foreground",
      )}
    >
      {label}
    </p>
    <p className="mt-2 font-heading text-3xl font-semibold tabular-nums">
      {value}
      <span
        className={cn(
          "ml-1 text-base font-normal",
          emphasized ? "opacity-70" : "text-muted-foreground",
        )}
      >
        {unit}
      </span>
    </p>
  </li>
);

export const AthleteDetails = ({ athlete }: { athlete: Athlete }) => {
  const t = useTranslations("Athletes");

  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="ghost" size="sm" className="-ml-2 mb-4" asChild>
        <Link href="/athletes">
          <ArrowLeft />
          {t("backToList")}
        </Link>
      </Button>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="font-heading text-2xl font-semibold">
            {athlete.name}
          </CardTitle>
          <CardDescription className="flex flex-wrap gap-2 pt-2">
            <Badge>{t(`genderValue.${athlete.gender}`)}</Badge>
            <Badge variant="secondary">
              {t(`ageCategoryValue.${athlete.ageCategory}`)}
            </Badge>
            <Badge variant="outline">{athlete.weightClass}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="grid list-none grid-cols-2 gap-3 md:grid-cols-4">
            {liftStats.map((stat) => (
              <LiftStat
                key={stat.labelKey}
                label={t(stat.labelKey)}
                value={stat.getValue(athlete)}
                unit={t("kg")}
                emphasized={stat.emphasized}
              />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
