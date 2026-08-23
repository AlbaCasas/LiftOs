import {
  isAgeCategory,
  isFemaleWeightClass,
  isGender,
  isMaleWeightClass,
  type NewAthlete,
  type NewAthleteDraft,
} from "./athlete";

const toKg = (raw: string) => {
  const value = raw.trim();
  if (!/^\d+$/.test(value)) return undefined;
  const kg = Number(value);
  return kg >= 1 ? kg : undefined;
};

export const toNewAthlete = (draft: NewAthleteDraft): NewAthlete | undefined => {
  const name = draft.name.trim();
  const gender = draft.gender.trim();
  const ageCategory = draft.ageCategory.trim();
  const weightClass = draft.weightClass.trim();
  const squat1rm = toKg(draft.squat1rm);
  const bench1rm = toKg(draft.bench1rm);
  const deadlift1rm = toKg(draft.deadlift1rm);

  if (
    !name ||
    squat1rm === undefined ||
    bench1rm === undefined ||
    deadlift1rm === undefined ||
    !isGender(gender) ||
    !isAgeCategory(ageCategory)
  ) {
    return undefined;
  }

  const shared = { name, ageCategory, squat1rm, bench1rm, deadlift1rm };

  if (gender === "female" && isFemaleWeightClass(weightClass)) {
    return { ...shared, gender, weightClass };
  }

  if (gender === "male" && isMaleWeightClass(weightClass)) {
    return { ...shared, gender, weightClass };
  }
};
