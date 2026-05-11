import en from "./locales/en.json";
import es from "./locales/es.json";

export const dictionaries = {
  en,
  es,
} as const;

export type Dictionary = typeof en;

export function getDictionary(locale: keyof typeof dictionaries = "en") {
  return dictionaries[locale];
}