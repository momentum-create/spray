import { NotFoundView } from "@/components/errors/NotFoundView";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { defaultLocale } from "@/i18n/config";
import { getCopy } from "@/i18n/get-copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | SPRAY",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const locale = defaultLocale;
  const copy = getCopy(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="bg-spray-bg">
        <NotFoundView locale={locale} copy={copy} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
