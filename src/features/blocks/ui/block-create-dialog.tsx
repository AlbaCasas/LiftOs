"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { BlockAthleteOption } from "../domain/block";
import { NewBlockForm } from "./new-block-form";

export const BlockCreateDialog = ({
  athletes,
}: {
  athletes: BlockAthleteOption[];
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Blocks");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{t("addBlock")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.createTitle")}</DialogTitle>
          <DialogDescription>{t("form.description")}</DialogDescription>
        </DialogHeader>
        <NewBlockForm
          key={open ? "open" : "closed"}
          athletes={athletes}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
