import { PageHero } from "@/components/ui/PageHero";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function StoryPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);

  return (
    <>
      <PageHero title={copy.about.story.title} />
      <section className="container-page max-w-2xl pb-12 text-spray-muted">
        <p>{copy.about.story.body}</p>
      </section>
    </>
  );
}
