import { cn } from "@/lib/cn";

export type StatusValue = "on-track" | "flagged";

const labels: Record<StatusValue, string> = {
  "on-track": "On Track",
  flagged: "Flagged",
};

export function Status({ value }: { value: StatusValue }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          value === "on-track" ? "bg-on-track-dot" : "bg-flagged-dot",
        )}
      />
      <span
        className={cn(
          "text-[13px]",
          value === "on-track" ? "text-on-track" : "text-flagged",
        )}
      >
        {labels[value]}
      </span>
    </span>
  );
}
