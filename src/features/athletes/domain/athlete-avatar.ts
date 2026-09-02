import type { Athlete } from "./athlete";
import { avatarTones } from "../ui/athlete-avatar";

export const avatarToneCount = avatarTones.length;

export type AthleteAvatar = {
  initials: string;
  toneIndex: number;
};

export type AthleteWithAvatar = Athlete & { avatar: AthleteAvatar };

export const initialsFor = (name: string) =>
  // Alba Casas -> AC
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const avatarToneFor = (id: string) => {
  let n = 0;
  for (const char of id) {
    n = (n * 31 + char.charCodeAt(0)) % avatarToneCount;
  }
  return n;
};

export const toAthleteAvatar = (
  athlete: Pick<Athlete, "id" | "name">,
): AthleteAvatar => ({
  initials: initialsFor(athlete.name),
  toneIndex: avatarToneFor(athlete.id),
});

export const withAvatar = (athlete: Athlete): AthleteWithAvatar => ({
  ...athlete,
  avatar: toAthleteAvatar(athlete),
});
