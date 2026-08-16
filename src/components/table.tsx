import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Table({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-left text-sm", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("border-b border-border", className)}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHeader({
  children,
  className,
  align = "left",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & {
  align?: "left" | "right";
}) {
  return (
    <th
      className={cn(
        "h-10 font-medium",
        align === "right" ? "px-3 text-right" : "px-3 first:pl-0 last:pr-0",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
  align = "left",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & {
  align?: "left" | "right";
}) {
  return (
    <td
      className={cn(
        "py-3",
        align === "right" ? "px-3 text-right" : "px-3 first:pl-0 last:pr-0",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}

export function TableSort({
  label,
  active,
  direction,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  direction: "asc" | "desc";
  onClick: () => void;
  align?: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 text-[12px] font-medium text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        align === "right" && "ml-auto",
      )}
    >
      {label}
      <span aria-hidden="true">{active ? (direction === "asc" ? "↑" : "↓") : "↕"}</span>
    </button>
  );
}

export function TableEmpty({
  colSpan,
  children,
}: {
  colSpan: number;
  children: ReactNode;
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-10 text-muted">
        {children}
      </TableCell>
    </TableRow>
  );
}
