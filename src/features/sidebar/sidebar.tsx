"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/button";
import { Shortcut } from "@/components/shortcut";
import { NavItem } from "@/components/nav-item";
import { SearchField } from "@/components/search-field";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const athletesActive = pathname === "/" || pathname.startsWith("/athletes");
  const blocksActive = pathname.startsWith("/blocks");
  const iconOnly = collapsed && !mobileOpen;

  function closeMobile() {
    setMobileOpen(false);
  }

  function submitSearch(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim();
    router.push(next ? `/?q=${encodeURIComponent(next)}` : "/");
    closeMobile();
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCollapsed(false);
        setMobileOpen(true);
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setMobileOpen(false);
        searchRef.current?.blur();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-panel px-3 md:hidden">
        <Button
          variant="icon"
          className="h-8 w-8"
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <span className="text-[15px] font-semibold tracking-tight">LiftOS</span>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 cursor-pointer bg-ink/25 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-dvh flex-col border-r border-border bg-panel transition-transform duration-200 ease-out md:static md:z-auto md:transition-[width]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          collapsed ? "w-[240px] md:w-[52px]" : "w-[240px]",
        )}
      >
        <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-border px-3">
          {!iconOnly ? (
            <Link
              href="/"
              onClick={closeMobile}
              className="text-[15px] font-semibold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              LiftOS
            </Link>
          ) : (
            <span className="sr-only">LiftOS</span>
          )}
          <Button
            variant="icon"
            onClick={() => setMobileOpen(false)}
            className="md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="icon"
            onClick={() => setCollapsed((value) => !value)}
            className="hidden md:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {!iconOnly && (
          <form className="px-2 pt-3" onSubmit={submitSearch}>
            <SearchField
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              aria-label="Search athletes"
              className="bg-ground"
              shortcut={
                <Shortcut className="ml-2 hidden sm:inline-flex">⌘K</Shortcut>
              }
            />
          </form>
        )}

        <nav
          className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3"
          aria-label="Workspace"
        >
          <NavItem
            href="/"
            title="Athletes"
            active={athletesActive}
            collapsed={iconOnly}
            onClick={closeMobile}
          >
            <Users className="h-4 w-4 shrink-0" />
            {!iconOnly && <span>Athletes</span>}
          </NavItem>

          <NavItem
            href="/blocks"
            title="Blocks"
            active={blocksActive}
            collapsed={iconOnly}
            onClick={closeMobile}
          >
            <ClipboardList className="h-4 w-4 shrink-0" />
            {!iconOnly && <span>Blocks</span>}
          </NavItem>
        </nav>

        <div className="shrink-0 border-t border-border px-2 py-3">
          <div
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5",
              iconOnly && "justify-center px-0",
            )}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-subtle">
              <User className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
            </span>
            {!iconOnly && (
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-ink">
                  Coach Davis
                </p>
                <p className="truncate text-[11px] text-muted">Pro Workspace</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
