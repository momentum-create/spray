import { LegalPage } from "@/components/content/LegalPage";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export default async function PrivacyPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const { privacy } = copy.legal;

  return (
    <LegalPage
      locale={locale}
      copy={copy}
      title={privacy.title}
      lead={privacy.lead}
      sections={privacy.sections}
      updated={privacy.updated}
    />
  );
}
