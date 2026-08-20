import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { totalKg } from "@/features/athletes/domain/total-kg";
import type { Athlete } from "@/features/athletes/domain/athlete";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface AthleteTableProps {
  athletes: Athlete[];
}
export const AthleteTable = ({ athletes }: AthleteTableProps) => {
  const t = useTranslations("Athletes");
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("table.name")}</TableHead>
          <TableHead>{t("table.gender")}</TableHead>
          <TableHead>{t("table.ageCategory")}</TableHead>
          <TableHead>{t("table.weightClass")}</TableHead>
          <TableHead>{t("table.squat1rm")}</TableHead>
          <TableHead>{t("table.bench1rm")}</TableHead>
          <TableHead>{t("table.deadlift1rm")}</TableHead>
          <TableHead>{t("table.totalKg")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {athletes.map((athlete) => (
          <TableRow key={athlete.id} className="relative cursor-pointer">
            <TableCell>
              <Link
                href={`/athletes/${athlete.id}`}
                className="after:absolute after:inset-0"
              >
                {athlete.name}
              </Link>
            </TableCell>
            <TableCell>{athlete.gender}</TableCell>
            <TableCell>{athlete.ageCategory}</TableCell>
            <TableCell>{athlete.weightClass}</TableCell>
            <TableCell>{athlete.squat1rm}</TableCell>
            <TableCell>{athlete.bench1rm}</TableCell>
            <TableCell>{athlete.deadlift1rm}</TableCell>
            <TableCell>{totalKg(athlete)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
