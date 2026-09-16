"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  patternFilterHref,
  patternFilters,
  type PatternFilter,
} from "../domain/exercise";

export const PatternTabs = ({ value }: { value: PatternFilter }) => {
  const t = useTranslations("Exercises");

  return (
    <Tabs value={value}>
      <TabsList variant="line">
        {patternFilters.map((patternFilter) => (
          <TabsTrigger
            key={patternFilter}
            value={patternFilter}
            className="cursor-pointer"
            asChild
          >
            <Link
              href={patternFilterHref(patternFilter)}
              prefetch={false}
              scroll={false}
            >
              {patternFilter === "all"
                ? t("tabs.all")
                : t(`patternValue.${patternFilter}`)}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
