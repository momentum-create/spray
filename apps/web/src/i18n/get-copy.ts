import { copy as copyJa } from "@/content/copy.ja";
import { copy as copyEn } from "@/content/copy.en";
import type { Copy } from "@/content/copy.ja";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Copy> = {
  ja: copyJa,
  en: copyEn,
};

export function getCopy(locale: Locale): Copy {
  return dictionaries[locale];
}

export type { Copy };
