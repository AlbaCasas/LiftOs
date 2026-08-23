"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AthleteForm } from "./athlete-form";

export const AthleteSheet = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Athletes");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>{t("addAthlete")}</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t("addAthlete")}</SheetTitle>
          <SheetDescription>{t("form.description")}</SheetDescription>
        </SheetHeader>
        <AthleteForm
          key={open ? "open" : "closed"}
          onSuccess={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};
