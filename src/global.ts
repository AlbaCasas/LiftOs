import type { locales } from "@/i18n/config";
import type es from "@/messages/es.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof es;
  }
}
