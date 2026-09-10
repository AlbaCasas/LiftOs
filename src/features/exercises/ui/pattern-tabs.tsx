"use client";

import { useTranslations } from "next-intl";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patternFilters, type PatternFilter } from "../domain/exercise";

export const PatternTabs = ({
  value,
  onChange,
}: {
  value: PatternFilter;
  onChange: (patternFilter: PatternFilter) => void;
}) => {
  const t = useTranslations("Exercises");

  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onChange(nextValue as PatternFilter)}
    >
      <TabsList variant="line">
        {patternFilters.map((patternFilter) => (
          <TabsTrigger
            key={patternFilter}
            value={patternFilter}
            className="cursor-pointer"
          >
            {patternFilter === "all"
              ? t("tabs.all")
              : t(`patternValue.${patternFilter}`)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
