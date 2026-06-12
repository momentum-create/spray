"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/i18n/config";

export function SetHtmlLang({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
