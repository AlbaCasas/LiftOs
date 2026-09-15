"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { createBlock } from "../application/create-block";
import {
  emptyNewBlockDraft,
  type BlockAthleteOption,
  type NewBlockDraft,
} from "../domain/block";
import { newBlockDraftSchema } from "../domain/to-new-block";

export const NewBlockForm = ({
  athletes,
  onSuccess,
}: {
  athletes: BlockAthleteOption[];
  onSuccess: () => void;
}) => {
  const t = useTranslations("Blocks");
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<NewBlockDraft>({
    resolver: zodResolver(newBlockDraftSchema, undefined, { raw: true }),
    defaultValues: emptyNewBlockDraft,
  });

  const onSubmit = handleSubmit((draft) => {
    startTransition(async () => {
      const result = await createBlock(draft);
      if (result && !result.ok) {
        setError("root", { message: result.message ?? t("form.failed") });
        return;
      }
      onSuccess();
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="athleteId">
          {t("table.athlete")}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        </Label>
        <NativeSelect id="athleteId" {...register("athleteId")} autoFocus>
          <option value="">
            {athletes.length > 0 ? t("form.select") : t("form.noAthletes")}
          </option>
          {athletes.map((athlete) => (
            <option key={athlete.id} value={athlete.id}>
              {athlete.name}
            </option>
          ))}
        </NativeSelect>
        {errors.athleteId?.message ? (
          <FieldError id="athlete-error">{t("form.errors.required")}</FieldError>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">
          {t("table.name")}
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder={t("form.namePlaceholder")}
        />
        {errors.name?.message ? (
          <FieldError id="name-error">{t("form.errors.required")}</FieldError>
        ) : null}
        {errors.root?.message ? (
          <FieldError className="text-sm">{errors.root.message}</FieldError>
        ) : null}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            {t("form.cancel")}
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending || athletes.length === 0}>
          {isPending ? t("form.creating") : t("form.create")}
        </Button>
      </DialogFooter>
    </form>
  );
};
