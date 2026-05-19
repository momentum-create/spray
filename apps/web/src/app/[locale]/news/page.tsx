import { LocaleLink } from "@/components/i18n/LocaleLink";
import { PageHero } from "@/components/ui/PageHero";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";
import { getNewsPosts } from "@/lib/wordpress";

type PageProps = { params: Promise<{ locale: string }> };

export default async function NewsPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const posts = await getNewsPosts(20);

  return (
    <>
      <PageHero title={copy.news.title} />
      <section className="container-page pb-12">
        {posts.length === 0 ? (
          <p className="text-spray-muted">{copy.news.empty}</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.id} className="border-b border-spray-border pb-6">
                <LocaleLink
                  href={`/news/${post.slug}`}
                  locale={locale}
                  className="text-lg hover:text-spray-orange"
                >
                  <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </LocaleLink>
                <time className="mt-1 block text-sm text-spray-muted">{post.date}</time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
