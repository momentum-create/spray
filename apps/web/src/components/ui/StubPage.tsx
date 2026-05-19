import type { Locale } from "@/i18n/config";
import { getCopy } from "@/i18n/get-copy";
import { PageHero } from "@/components/ui/PageHero";

type StubPageProps = {
  locale: Locale;
  title: string;
  lead?: string;
  path: string;
};

export function StubPage({ locale, title, lead, path }: StubPageProps) {
  const ui = getCopy(locale).ui.stub;

  return (
    <>
      <PageHero title={title} lead={lead} />
      <div className="container-page">
        <p className="text-sm text-spray-muted">
          {ui.planned}: <code className="text-spray-orange">{path}</code>
        </p>
      </div>
    </>
  );
}
