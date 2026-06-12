import { LegalPage } from "@/components/content/LegalPage";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { company } = getCopy(locale).legal;
  return {
    title: company.title,
    description: company.lead,
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const { company } = copy.legal;

  return (
    <>
      <LegalPage
        locale={locale}
        copy={copy}
        title={company.title}
        lead={company.lead}
        sections={company.sections}
      />
      <div className="container-page -mt-8 max-w-2xl pb-12">
        <LocaleLink
          href="/about/story"
          locale={locale}
          className="text-sm text-spray-blue hover:underline"
        >
          {company.linkStory} →
        </LocaleLink>
      </div>
    </>
  );
}
