"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Heading } from "@/components/ui/heading";
import { searchAthletes } from "../domain/athlete";
import type { AthleteWithAvatar } from "../domain/athlete-avatar";
import { AthleteSearch } from "./athlete-search";
import { AthleteSheet } from "./athlete-sheet";
import { AthleteTable } from "./athlete-table";

export const AthleteList = ({
  athletes,
}: {
  athletes: AthleteWithAvatar[];
}) => {
  const t = useTranslations("Athletes");
  const [searchQuery, setSearchQuery] = useState("");
  const visibleAthletes = searchAthletes(athletes, searchQuery);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <Heading>{t("pageTitle")}</Heading>
          <span className="text-sm text-muted-foreground">
            {athletes.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AthleteSearch
            athletes={athletes}
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />
          <AthleteSheet />
        </div>
      </div>
      <AthleteTable
        athletes={visibleAthletes}
        isSearch={searchQuery.trim().length > 0}
      />
    </div>
  );
};
