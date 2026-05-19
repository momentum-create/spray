import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);

  return (
    <article className="container-page py-12">
      <p className="text-sm text-spray-muted">slug: {slug}</p>
      <p className="mt-8 text-spray-muted">
        {locale === "ja"
          ? "WordPress 投稿本文は API 接続後に表示"
          : "Post body will appear after WordPress API is connected."}
      </p>
      <LocaleLink href="/news" locale={locale} className="mt-8 inline-block text-spray-blue hover:underline">
        {copy.news.back}
      </LocaleLink>
    </article>
  );
}
