import { TrendingDown, TrendingUp } from "lucide-react";

export type TrendValue = "up" | "down" | "flat";

export function Trend({ value }: { value: TrendValue }) {
  if (value === "up") {
    return (
      <TrendingUp className="h-4 w-4 text-on-track" aria-label="Trending up" />
    );
  }
  if (value === "down") {
    return (
      <TrendingDown className="h-4 w-4 text-down" aria-label="Trending down" />
    );
  }
  return (
    <span className="text-sm text-muted" aria-label="Flat trend">
      —
    </span>
  );
}
