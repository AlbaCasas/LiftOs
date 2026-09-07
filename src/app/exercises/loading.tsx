import { Skeleton } from "@/components/ui/skeleton";

export default function ExercisesLoading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-36" />
      <div className="overflow-hidden rounded-xl border bg-card p-3">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
