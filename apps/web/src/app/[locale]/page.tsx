import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomePageGrid } from "@/components/home/HomePageGrid";
import { HomeParkStatusBanner } from "@/components/home/HomeParkStatusBanner";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";
import { getNewsPosts } from "@/lib/wordpress";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return {
    title: copy.home.meta.title,
    description: copy.home.meta.description,
  };
}

export default async function HomePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const news = await getNewsPosts(3);

  return (
    <>
      <HomeHero locale={locale} copy={copy} />
      <HomeParkStatusBanner locale={locale} copy={copy} />
      <div className="mx-auto max-w-site px-4 py-8 md:px-6">
        <HomePageGrid locale={locale} copy={copy} posts={news} />
      </div>
    </>
  );
}
