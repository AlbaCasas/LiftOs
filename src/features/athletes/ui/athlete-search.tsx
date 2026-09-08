"use client";

import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { KbdKeyboard } from "@/components/ui/kbd-keyboard";
import { cn } from "@/lib/cn";
import { searchAthletes } from "../domain/athlete";
import type { AthleteWithAvatar } from "../domain/athlete-avatar";

export const AthleteSearch = ({
  athletes,
  query,
  onQueryChange,
}: {
  athletes: AthleteWithAvatar[];
  query: string;
  onQueryChange: (query: string) => void;
}) => {
  const t = useTranslations("Athletes");
  const [open, setOpen] = useState(false);
  const matches = searchAthletes(athletes, query);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k") {
        return;
      }
      if (!event.metaKey && !event.ctrlKey) {
        return;
      }
      event.preventDefault();
      setOpen((isOpen) => !isOpen);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="w-56 justify-start"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="athlete-search-list"
        onClick={() => setOpen(true)}
      >
        <SearchIcon data-icon="inline-start" />
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-left",
            !query && "text-muted-foreground",
          )}
        >
          {query || t("search.placeholder")}
        </span>
        <KbdKeyboard className="ml-auto">⌘K</KbdKeyboard>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={false}
        title={t("search.title")}
        description={t("search.description")}
      >
        <CommandInput
          placeholder={t("search.placeholder")}
          value={query}
          onValueChange={onQueryChange}
        />
        <CommandList id="athlete-search-list">
          <CommandEmpty>{t("search.empty")}</CommandEmpty>
          {matches.length > 0 ? (
            <CommandGroup heading={t("pageTitle")}>
              {matches.map((athlete) => (
                <CommandItem
                  key={athlete.id}
                  value={athlete.id}
                  onSelect={() => {
                    onQueryChange(athlete.name);
                    setOpen(false);
                  }}
                >
                  <span className="min-w-0 flex-1 truncate">{athlete.name}</span>
                  <span className="text-muted-foreground">
                    {athlete.weightClass}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
};
