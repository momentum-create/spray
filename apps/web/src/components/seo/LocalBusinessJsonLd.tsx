import { getSiteFacts } from "@/content/get-site-facts";
import type { Locale } from "@/i18n/config";

type Props = { locale: Locale };

export function LocalBusinessJsonLd({ locale }: Props) {
  const { address, contact, hours, company } = getSiteFacts(locale);

  const data = {
    "@context": "https://schema.org",
    "@type": "SportingGoodsStore",
    name: "SPRAY",
    description: company.description,
    url: "https://www.spray166.com",
    telephone: contact.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.line,
      addressLocality: "旭川市",
      addressRegion: "北海道",
      postalCode: address.postalCode,
      addressCountry: "JP",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "12:00",
        closes: "19:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
