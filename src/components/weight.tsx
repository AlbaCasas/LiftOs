export function Weight({
  value,
  unit = "kg",
}: {
  value: number | null;
  unit?: string;
}) {
  if (value === null) {
    return <span className="text-muted">—</span>;
  }

  return (
    <span className="font-medium tabular-nums">
      {value}{" "}
      <span className="text-[11px] font-normal text-muted">{unit}</span>
    </span>
  );
}
