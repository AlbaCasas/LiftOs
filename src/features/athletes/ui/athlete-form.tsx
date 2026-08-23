"use client";

import { useForm, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { createAthlete } from "../application/create-athlete";
import {
  ageCategories,
  emptyAthleteDraft,
  genders,
  isGender,
  isWeightClassFor,
  weightClassesFor,
  type Gender,
  type NewAthleteDraft,
} from "../domain/athlete";
import { AthleteField } from "./athlete-field";

const liftFields = [
  { name: "squat1rm", labelKey: "form.squat1rm" },
  { name: "bench1rm", labelKey: "form.bench1rm" },
  { name: "deadlift1rm", labelKey: "form.deadlift1rm" },
] as const;

export const AthleteForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const t = useTranslations("Athletes");
  const required = t("form.errors.required");
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewAthleteDraft>({
    defaultValues: emptyAthleteDraft,
  });

  const gender = useWatch({ control, name: "gender" });
  const weightClasses = gender ? weightClassesFor(gender as Gender) : [];
  const errorOf = (name: keyof NewAthleteDraft) => errors[name]?.message;

  const onSubmit = handleSubmit(async (draft) => {
    const result = await createAthlete(draft);
    if (!result.ok) {
      setError("root", { message: result.message ?? t("form.failed") });
      return;
    }
    onSuccess();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
        <AthleteField id="name" label={t("table.name")} error={errorOf("name")}>
          <Input
            {...register("name", { required })}
            autoComplete="name"
            autoFocus
          />
        </AthleteField>

        <div className="grid grid-cols-2 gap-3">
          <AthleteField
            id="gender"
            label={t("table.gender")}
            error={errorOf("gender")}
          >
            <NativeSelect
              {...register("gender", {
                required,
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

          <AthleteField
            id="ageCategory"
            label={t("table.ageCategory")}
            error={errorOf("ageCategory")}
          >
            <NativeSelect {...register("ageCategory", { required })}>
              <option value="">{t("form.select")}</option>
              {ageCategories.map((value) => (
                <option key={value} value={value}>
                  {t(`ageCategoryValue.${value}`)}
                </option>
              ))}
            </NativeSelect>
          </AthleteField>
        </div>

        <AthleteField
          id="weightClass"
          label={t("table.weightClass")}
          error={errorOf("weightClass")}
        >
          <NativeSelect
            {...register("weightClass", {
              required,
              validate: (value, values) =>
                !isGender(values.gender) ||
                isWeightClassFor(values.gender, value) ||
                t("form.errors.weightClassMismatch"),
            })}
            disabled={!gender}
          >
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
              id={name}
              label={t(labelKey)}
              error={errorOf(name)}
              suffix={t("kg")}
            >
              <Input
                {...register(name, {
                  required,
                  validate: (value) =>
                    (/^\d+$/.test(value) && Number(value) >= 1) ||
                    t("form.errors.notPositive"),
                })}
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
              />
            </AthleteField>
          ))}
        </div>

        {errors.root?.message ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.root.message}
          </p>
        ) : null}
      </div>

      <SheetFooter className="flex-row justify-end">
        <SheetClose asChild>
          <Button type="button" variant="outline">
            {t("form.cancel")}
          </Button>
        </SheetClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("form.saving") : t("form.save")}
        </Button>
      </SheetFooter>
    </form>
  );
};
