import type { Metadata } from "next";
import { SkateparkPricesView } from "@/components/skatepark/SkateparkPricesView";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  const isJa = locale === "ja";

  return {
    title: isJa
      ? "料金・営業時間 | SPRAY 屋内スケートパーク（旭川）"
      : "Fees & hours | SPRAY indoor skate park, Asahikawa",
    description: isJa
      ? "北海道旭川・SPRAY 屋内スケートパークの利用料金と営業時間。会員・ビジター・レンタル・見学の料金表（税込）と定休日。"
      : "Admission and hours for SPRAY’s indoor skate park in Asahikawa. Member, visitor, rental, and spectator info — tax included.",
  };
}

export default async function SkateparkPricesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);
  return <SkateparkPricesView locale={locale} copy={copy} />;
}
