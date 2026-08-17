import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <main className="p-6">
      <Button>{t("newWeek")}</Button>
    </main>
  );
}
