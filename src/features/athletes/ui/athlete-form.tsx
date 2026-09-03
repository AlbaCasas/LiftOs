"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { createAthlete } from "../application/create-athlete";
import {
  ageCategories,
  emptyAthleteDraft,
  genders,
  isGender,
  weightClassesFor,
} from "../domain/athlete";
import { newAthleteDraftSchema } from "../domain/to-new-athlete";
import { AthleteField } from "./athlete-field";

const liftFields = [
  { name: "squat1rm", labelKey: "form.squat1rm" },
  { name: "bench1rm", labelKey: "form.bench1rm" },
  { name: "deadlift1rm", labelKey: "form.deadlift1rm" },
] as const;

export const AthleteForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const t = useTranslations("Athletes");
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(newAthleteDraftSchema, undefined, { raw: true }),
    defaultValues: emptyAthleteDraft,
  });
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = form;

  const gender = useWatch({ control, name: "gender" });
  const weightClasses = isGender(gender) ? weightClassesFor(gender) : [];

  const onSubmit = handleSubmit((draft) => {
    startTransition(async () => {
      const result = await createAthlete(draft);
      if (result && !result.ok) {
        setError("root", { message: result.message ?? t("form.failed") });
        return;
      }
      onSuccess();
    });
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          <AthleteField name="name" label={t("table.name")}>
            <Input {...register("name")} autoComplete="name" autoFocus />
          </AthleteField>

          <div className="grid grid-cols-2 gap-3">
            <AthleteField name="gender" label={t("table.gender")}>
              <NativeSelect
                {...register("gender", {
                  onChange: () => setValue("weightClass", ""),
                })}
              >
                <option value="">{t("form.select")}</option>
                {genders.map((value) => (
                  <option key={value} value={value}>
                    {t(`genderValue.${value}`)}
                  </option>
                ))}
              </NativeSelect>
            </AthleteField>

            <AthleteField name="ageCategory" label={t("table.ageCategory")}>
              <NativeSelect {...register("ageCategory")}>
                <option value="">{t("form.select")}</option>
                {ageCategories.map((value) => (
                  <option key={value} value={value}>
                    {t(`ageCategoryValue.${value}`)}
                  </option>
                ))}
              </NativeSelect>
            </AthleteField>
          </div>

          <AthleteField name="weightClass" label={t("table.weightClass")}>
            <NativeSelect {...register("weightClass")} disabled={!gender}>
              <option value="">
                {gender ? t("form.select") : t("form.selectGenderFirst")}
              </option>
              {weightClasses.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </NativeSelect>
          </AthleteField>

          <div className="grid grid-cols-3 gap-3">
            {liftFields.map(({ name, labelKey }) => (
              <AthleteField
                key={name}
                name={name}
                label={t(labelKey)}
                suffix={t("kg")}
              >
                <Input
                  {...register(name)}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  step={1}
                />
              </AthleteField>
            ))}
          </div>

          {errors.root?.message ? (
            <FieldError className="text-sm">{errors.root.message}</FieldError>
          ) : null}
        </div>

        <SheetFooter className="flex-row justify-end">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              {t("form.cancel")}
            </Button>
          </SheetClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? t("form.saving") : t("form.save")}
          </Button>
        </SheetFooter>
      </form>
    </FormProvider>
  );
};
