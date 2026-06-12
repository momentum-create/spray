import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OwlGoggleReserveView } from "@/components/shop/OwlGoggleReserveView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const o = copy.owlGoggle;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? copy.site.url;

  return {
    title: o.meta.title,
    description: o.meta.description,
    openGraph: {
      title: o.meta.title,
      description: o.meta.description,
      url: `${siteUrl}/${locale}/shop/owl-goggle`,
      images: [{ url: "/images/owl-goggle/design-sheet-flow-vent.png", alt: o.meta.title }],
    },
  };
}

export default async function OwlGogglePage({ params }: PageProps) {
  const locale = await resolveLocale(params);

  if (locale === "en") {
    redirect("/en/products/spray/owl-goggle");
  }

  const copy = getCopy(locale);
  return <OwlGoggleReserveView locale={locale} copy={copy} />;
}
