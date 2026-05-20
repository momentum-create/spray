import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getCopy } from "@/i18n/get-copy";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getCopy(locale);
  return {
    title: copy.home.meta.title,
    description: copy.home.meta.description,
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <>
      <SetHtmlLang locale={locale} />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
      <MobileCtaBar locale={locale} />
    </>
  );
}
