import type { AthleteAvatar as AthleteAvatarData } from "@/features/athletes/domain/athlete-avatar";
import { cn } from "@/lib/cn";

export const avatarTones = [
  "bg-sky-100 text-sky-800",
  "bg-violet-100 text-violet-800",
  "bg-amber-100 text-amber-800",
  "bg-emerald-100 text-emerald-800",
  "bg-rose-100 text-rose-800",
  "bg-teal-100 text-teal-800",
  "bg-orange-100 text-orange-800",
  "bg-indigo-100 text-indigo-800",
] as const;

export const AthleteAvatar = ({ initials, toneIndex }: AthleteAvatarData) => (
  <span
    className={cn(
      "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",
      avatarTones[toneIndex],
    )}
  >
    {initials}
  </span>
);
