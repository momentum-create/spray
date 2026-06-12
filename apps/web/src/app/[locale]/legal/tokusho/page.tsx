import { LegalPage } from "@/components/content/LegalPage";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { tokusho } = getCopy(locale).legal;
  return {
    title: tokusho.title,
    description: tokusho.lead,
  };
}

export default async function TokushoPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const { tokusho } = copy.legal;

  return (
    <LegalPage
      locale={locale}
      copy={copy}
      title={tokusho.title}
      lead={tokusho.lead}
      sections={tokusho.sections}
      updated={tokusho.updated}
    />
  );
}
