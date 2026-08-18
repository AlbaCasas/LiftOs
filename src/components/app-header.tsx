import { getTranslations } from "next-intl/server";

export async function AppHeader() {
  const t = await getTranslations("Header");

  return <header>{t("appName")}</header>;
}
