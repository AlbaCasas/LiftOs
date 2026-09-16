"use client";

import { useTranslations } from "next-intl";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const MeetLiftField = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  const t = useTranslations("Exercises");

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col gap-0.5">
        <Label htmlFor="isMeetLift">{t("table.meetLift")}</Label>
        <p className="text-sm text-muted-foreground">{t("form.meetLiftHint")}</p>
      </div>
      <Switch
        id="isMeetLift"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
