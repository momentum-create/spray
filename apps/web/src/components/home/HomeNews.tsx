import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { designAssets } from "@/lib/design-assets";

type HomeNewsProps = {
  locale: Locale;
  copy: Copy;
  posts: { id: number; slug: string; title: { rendered: string }; date: string }[];
};

const HOME_NEWS_LIMIT = 3;

export function HomeNews({ locale, copy, posts }: HomeNewsProps) {
  const promoted = copy.home.news.promoted.map((item, i) => ({
    key: `promo-${item.href}`,
    n: i + 1,
    title: item.title,
    href: item.href,
    image: item.image ?? designAssets.pict.homeFull,
  }));

  const wpItems = posts.map((p, i) => ({
    key: `wp-${p.slug}`,
    n: promoted.length + i + 1,
    title: p.title.rendered.replace(/<[^>]+>/g, ""),
    href: `/news/${p.slug}`,
    image: designAssets.pict.homeFull,
  }));

  const items = [...promoted, ...wpItems].slice(0, HOME_NEWS_LIMIT);

  if (items.length === 0) {
    return (
      <section>
        <h2 className="section-label mb-3">{copy.home.news.heading}</h2>
        <div className="border border-spray-border bg-[#141414] p-4">
          <p className="text-sm text-spray-muted">{copy.news.empty}</p>
          <p className="mt-2 text-xs text-spray-muted">{copy.news.emptyHint}</p>
          <LocaleLink
            href="/news"
            locale={locale}
            className="mt-3 inline-block text-xs font-bold text-spray-orange hover:underline"
          >
            {copy.news.viewAll} →
          </LocaleLink>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-label mb-3">{copy.home.news.heading}</h2>
      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <LocaleLink
            key={item.key}
            href={item.href}
            locale={locale}
            className="block hover:opacity-90"
          >
            <div className="relative aspect-video overflow-hidden bg-spray-surface">
              <span className="news-badge">{item.n}</span>
              <Image src={item.image} alt="" fill className="object-cover opacity-80" sizes="33vw" />
            </div>
            <p className="mt-2 text-xs font-bold leading-snug text-white">{item.title}</p>
          </LocaleLink>
        ))}
      </div>
      <LocaleLink
        href="/news"
        locale={locale}
        className="mt-3 inline-block text-xs font-bold text-spray-orange hover:underline"
      >
        {copy.cta.viewAllNews} →
      </LocaleLink>
    </section>
  );
}
