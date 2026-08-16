"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { PageShell } from "@/components/page-shell";
import { SearchField } from "@/components/search-field";
import { Select } from "@/components/select";
import { Status } from "@/components/status";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSort,
} from "@/components/table";
import { Trend } from "@/components/trend";
import { Weight } from "@/components/weight";
import {
  athletes as seedAthletes,
  totalKg,
  weightClasses,
  type Athlete,
  type AthleteStatus,
} from "@/data/athletes";

type SortKey =
  | "name"
  | "weightClass"
  | "status"
  | "squatKg"
  | "benchKg"
  | "deadliftKg"
  | "total"
  | "lastActiveDays"
  | "trend";

const TREND_ORDER = { down: 0, flat: 1, up: 2 } as const;

function lastActiveLabel(days: number) {
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function slugify(name: string) {
  const base =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "athlete";
  return base;
}

export function AthletesPage({ query = "" }: { query?: string }) {
  const [rows, setRows] = useState<Athlete[]>(seedAthletes);
  const [filter, setFilter] = useState(query);
  const [status, setStatus] = useState<"all" | AthleteStatus>("all");
  const [weightClass, setWeightClass] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [drafting, setDrafting] = useState(false);
  const [draftName, setDraftName] = useState("");

  const classes = useMemo(() => weightClasses(), []);

  const visible = useMemo(() => {
    const needle = filter.trim().toLowerCase();

    const filtered = rows.filter((athlete) => {
      if (needle && !athlete.name.toLowerCase().includes(needle)) return false;
      if (status !== "all" && athlete.status !== status) return false;
      if (weightClass !== "all" && athlete.weightClass !== weightClass) {
        return false;
      }
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const direction = sortDir === "asc" ? 1 : -1;
      if (sortKey === "total") {
        return direction * ((totalKg(a) ?? -1) - (totalKg(b) ?? -1));
      }
      if (sortKey === "trend") {
        return direction * (TREND_ORDER[a.trend] - TREND_ORDER[b.trend]);
      }
      if (sortKey === "status") {
        return direction * a.status.localeCompare(b.status);
      }
      const left = a[sortKey];
      const right = b[sortKey];
      if (typeof left === "number" && typeof right === "number") {
        return direction * (left - right);
      }
      return direction * String(left).localeCompare(String(right));
    });

    return sorted;
  }, [filter, rows, sortDir, sortKey, status, weightClass]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((value) => (value === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(key === "name" || key === "weightClass" ? "asc" : "desc");
  }

  function addAthlete() {
    const name = draftName.trim();
    if (!name) return;

    let id = slugify(name);
    let suffix = 2;
    const used = new Set(rows.map((row) => row.id));
    while (used.has(id)) {
      id = `${slugify(name)}-${suffix}`;
      suffix += 1;
    }

    setRows((current) => [
      {
        id,
        name,
        weightClass: "",
        status: "on-track",
        squatKg: null,
        benchKg: null,
        deadliftKg: null,
        lastActiveDays: 0,
        trend: "flat",
      },
      ...current,
    ]);
    setDraftName("");
    setDrafting(false);
  }

  return (
    <PageShell
      title="Athletes"
      action={
        <Button
          onClick={() => {
            setDrafting(true);
            setDraftName("");
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          Add athlete
        </Button>
      }
      toolbar={
        <>
          <SearchField
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Filter..."
            aria-label="Filter athletes"
            className="w-full max-w-[220px]"
          />
          <Select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as "all" | AthleteStatus)
            }
            aria-label="Filter by status"
          >
            <option value="all">Status</option>
            <option value="on-track">On Track</option>
            <option value="flagged">Flagged</option>
          </Select>
          <Select
            value={weightClass}
            onChange={(event) => setWeightClass(event.target.value)}
            aria-label="Filter by class"
          >
            <option value="all">Class</option>
            {classes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </>
      }
    >
      <Table className="min-w-[760px]">
        <TableHead>
          <TableRow>
            <TableHeader>
              <TableSort
                label="Name"
                active={sortKey === "name"}
                direction={sortDir}
                onClick={() => toggleSort("name")}
              />
            </TableHeader>
            <TableHeader>
              <TableSort
                label="Class"
                active={sortKey === "weightClass"}
                direction={sortDir}
                onClick={() => toggleSort("weightClass")}
              />
            </TableHeader>
            <TableHeader>
              <TableSort
                label="Status"
                active={sortKey === "status"}
                direction={sortDir}
                onClick={() => toggleSort("status")}
              />
            </TableHeader>
            <TableHeader align="right">
              <TableSort
                label="SQ"
                active={sortKey === "squatKg"}
                direction={sortDir}
                onClick={() => toggleSort("squatKg")}
                align="right"
              />
            </TableHeader>
            <TableHeader align="right">
              <TableSort
                label="BP"
                active={sortKey === "benchKg"}
                direction={sortDir}
                onClick={() => toggleSort("benchKg")}
                align="right"
              />
            </TableHeader>
            <TableHeader align="right">
              <TableSort
                label="DL"
                active={sortKey === "deadliftKg"}
                direction={sortDir}
                onClick={() => toggleSort("deadliftKg")}
                align="right"
              />
            </TableHeader>
            <TableHeader align="right">
              <TableSort
                label="Total"
                active={sortKey === "total"}
                direction={sortDir}
                onClick={() => toggleSort("total")}
                align="right"
              />
            </TableHeader>
            <TableHeader>
              <TableSort
                label="Last Active"
                active={sortKey === "lastActiveDays"}
                direction={sortDir}
                onClick={() => toggleSort("lastActiveDays")}
              />
            </TableHeader>
            <TableHeader>
              <TableSort
                label="Trend"
                active={sortKey === "trend"}
                direction={sortDir}
                onClick={() => toggleSort("trend")}
              />
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {drafting ? (
            <TableRow>
              <TableCell colSpan={9}>
                <Input
                  autoFocus
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addAthlete();
                    }
                    if (event.key === "Escape") {
                      setDrafting(false);
                      setDraftName("");
                    }
                  }}
                  onBlur={() => {
                    if (!draftName.trim()) setDrafting(false);
                  }}
                  placeholder="Athlete name"
                  aria-label="New athlete name"
                  className="max-w-xs border-border-strong"
                />
              </TableCell>
            </TableRow>
          ) : null}
          {visible.length === 0 ? (
            <TableEmpty colSpan={9}>No athletes match these filters.</TableEmpty>
          ) : (
            visible.map((athlete) => (
              <TableRow key={athlete.id} className="hover:bg-subtle/70">
                <TableCell>
                  {seedAthletes.some((row) => row.id === athlete.id) ? (
                    <Link
                      href={`/athletes/${athlete.id}`}
                      className="font-medium text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {athlete.name}
                    </Link>
                  ) : (
                    <span className="font-medium text-ink">{athlete.name}</span>
                  )}
                </TableCell>
                <TableCell className="text-secondary">
                  {athlete.weightClass || "—"}
                </TableCell>
                <TableCell>
                  <Status value={athlete.status} />
                </TableCell>
                <TableCell align="right">
                  <Weight value={athlete.squatKg} />
                </TableCell>
                <TableCell align="right">
                  <Weight value={athlete.benchKg} />
                </TableCell>
                <TableCell align="right">
                  <Weight value={athlete.deadliftKg} />
                </TableCell>
                <TableCell align="right">
                  <Weight value={totalKg(athlete)} />
                </TableCell>
                <TableCell className="text-secondary">
                  {lastActiveLabel(athlete.lastActiveDays)}
                </TableCell>
                <TableCell>
                  <Trend value={athlete.trend} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </PageShell>
  );
}
