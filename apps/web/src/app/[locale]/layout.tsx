import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { DawnShell } from "@/components/inbound/dawn/DawnShell";
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? copy.site.url;
  return {
    metadataBase: new URL(siteUrl),
    title: copy.home.meta.title,
    description: copy.home.meta.description,
    openGraph: {
      title: copy.home.meta.title,
      description: copy.home.meta.description,
      url: `${siteUrl}/${locale}`,
      siteName: copy.site.name,
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: copy.site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.home.meta.title,
      description: copy.home.meta.description,
      images: ["/og-default.jpg"],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dawnLayout = (await headers()).get("x-dawn-layout") === "1";

  const langScript = (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)}`,
      }}
    />
  );

  if (dawnLayout) {
    return (
      <>
        {langScript}
        <SetHtmlLang locale={locale} />
        <DawnShell>{children}</DawnShell>
      </>
    );
  }

  return (
    <>
      {langScript}
      <SetHtmlLang locale={locale} />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <CookieConsentBanner locale={locale} banner={getCopy(locale).consent.banner} />
      <SiteFooter locale={locale} />
      <MobileCtaBar locale={locale} />
    </>
  );
}
