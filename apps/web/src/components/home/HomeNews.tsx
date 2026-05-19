import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { designAssets } from "@/lib/design-assets";

const fallbackNews = [
  { n: 1, title: "WINTER OPENING SCHEDULE", image: designAssets.skateparkHero },
  { n: 2, title: "NEW SKATE DECK LINEUP", image: designAssets.pict.maintenance },
  { n: 3, title: "PARK ENHANCEMENT UPDATE", image: designAssets.pict.homePanels },
];

type HomeNewsProps = {
  locale: Locale;
  copy: Copy;
  posts: { id: number; slug: string; title: { rendered: string }; date: string }[];
};

export function HomeNews({ locale, copy, posts }: HomeNewsProps) {
  const items =
    posts.length > 0
      ? posts.slice(0, 3).map((p, i) => ({
          n: i + 1,
          title: p.title.rendered.replace(/<[^>]+>/g, ""),
          slug: p.slug,
          image: fallbackNews[i]?.image ?? designAssets.pict.homeFull,
        }))
      : fallbackNews.map((f) => ({ ...f, slug: null as string | null }));

  return (
    <section>
      <h2 className="section-label mb-3">{copy.home.news.heading}</h2>
      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => {
          const inner = (
            <>
              <div className="relative aspect-video overflow-hidden bg-spray-surface">
                <span className="news-badge">{item.n}</span>
                <Image src={item.image} alt="" fill className="object-cover opacity-80" sizes="33vw" />
              </div>
              <p className="mt-2 text-xs font-bold uppercase leading-snug text-white">{item.title}</p>
            </>
          );
          return item.slug ? (
            <LocaleLink key={item.n} href={`/news/${item.slug}`} locale={locale} className="block hover:opacity-90">
              {inner}
            </LocaleLink>
          ) : (
            <div key={item.n}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
