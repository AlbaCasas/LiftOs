import { cn } from "@/lib/cn";

const avatarTones = [
  "bg-sky-100 text-sky-800",
  "bg-violet-100 text-violet-800",
  "bg-amber-100 text-amber-800",
  "bg-emerald-100 text-emerald-800",
  "bg-rose-100 text-rose-800",
  "bg-teal-100 text-teal-800",
  "bg-orange-100 text-orange-800",
  "bg-indigo-100 text-indigo-800",
] as const;

const initialsFor = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const avatarToneFor = (id: string) => {
  let hash = 0;
  for (const char of id) hash = char.charCodeAt(0) + ((hash << 5) - hash);
  return avatarTones[Math.abs(hash) % avatarTones.length];
};

export const AthleteAvatar = ({ id, name }: { id: string; name: string }) => (
  <span
    className={cn(
      "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",
      avatarToneFor(id),
    )}
  >
    {initialsFor(name)}
  </span>
);
