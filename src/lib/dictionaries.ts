import "server-only";

export type Locale = "fr" | "en" | "es";
export const locales: Locale[] = ["fr", "en", "es"];
export const defaultLocale: Locale = "fr";

export const hasLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);

const dictionaries = {
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  es: () => import("@/dictionaries/es.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
