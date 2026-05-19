import { siteFacts as base } from "./site-facts";
import type { Locale } from "@/i18n/config";

const localized = {
  ja: base,
  en: {
    ...base,
    company: {
      ...base.company,
      legalName: "SPRAY Co., Ltd.",
      representative: "Representative Director Kenji Arai",
      tagline: "SPRAY — spread and reach further.",
      description: "Extreme sports specialty store in Asahikawa, Hokkaido.",
    },
    address: {
      postalCode: "078-8242",
      line: "1-8 Toyooka 12-jo 1-chome, Asahikawa, Hokkaido",
      full: "1-8 Toyooka 12-jo 1-chome, Asahikawa, Hokkaido 078-8242, Japan",
    },
    hours: {
      ...base.hours,
      label: "12:00–19:00",
      closedDay: "Wednesday",
      note: "As listed on spray166.com (park fees on separate chart).",
    },
    access: {
      byCarFromStation: "About 15 min from Asahikawa Station",
      byCarFromAirport: "About 30 min from Asahikawa Airport",
      byCarDetail:
        "From the station, take Route 39, turn right on Doubutsuen-dori; we are on the left in 750 m.",
      byBus:
        "Take Asahikawa Denki Kido bus 47 (Asahiyama Zoo). Get off at 10-jo 22-chome (Best Price). Walk 4 min (270 m) toward the zoo.",
      busLine: "Line 47 — Asahiyama Zoo (10-jo)",
      busTimetable: base.access.busTimetable,
      mapsEmbedUrl: base.access.mapsEmbedUrl,
    },
    history: [
      { year: "1996", text: "Opened predecessor shop in Higashi-hikari, Asahikawa" },
      {
        year: "July 1998",
        text: "Opened current Toyooka location with indoor skate park",
      },
    ],
    skatepark: {
      ...base.skatepark,
      headline: "One of Japan's largest — 580㎡ indoor park",
      subhead: "*spray skate park*",
      intro:
        "Our expanded street course is more fun than ever — drop in anytime!",
      sections: [
        {
          name: "Street course",
          level: null,
          description: "Expanded street layout for beginners through advanced riders.",
        },
        {
          name: "Fun Box",
          level: "★★☆☆☆",
          description: "Section for air height and style — friendly competition.",
        },
      ],
      priceNote:
        "Park fees are published as an image chart on spray166.com (no HTML table yet).",
    },
    maintenance: {
      lead:
        "Our experienced team handles your tune-ups with care. Peak season fills up — book early!",
      tuneUp: [
        {
          name: "Sanding",
          description:
            "Thins the base to clean minor scratches and refresh oxidized soles. Edges and wax absorption improve.",
          price: "¥6,600",
        },
        {
          name: "Side edge tune",
          description: "Edge sharpening",
          price: "¥3,300",
          note: "Side + sole edge tune ¥6,600",
        },
        {
          name: "Hot wax",
          description:
            "Iron wax for strong glide and durability. Used boards may need sole/edge cleaning.",
          price: "¥3,300 (snowboard) / ¥4,400 (ski)",
          note: "Cleaning from +¥2,200",
        },
        {
          name: "Base repair",
          description: "Repair gouges in the base",
          price: "Quote required",
        },
      ],
      labor: [
        {
          name: "Boot lace / wire replace (1 spot)",
          description: "We keep your boots overnight due to labor time.",
          price: "from ¥4,400",
        },
        {
          name: "Boot liner heat molding",
          description:
            "About 30 min total (15 min heat + 15 min mold). Bring your riding socks.",
          price: "from ¥5,500",
          note: "Hard boots ¥8,800",
        },
        {
          name: "Binding setup (snowboard)",
          description: "Snowboard",
          price: "from ¥4,400",
        },
      ],
      priceSheetImageUrl: base.maintenance.priceSheetImageUrl,
    },
    staff: base.staff.map((s) => ({
      ...s,
      birthplace: "Biei, Kamikawa, Hokkaido",
    })),
  },
} as const;

export function getSiteFacts(locale: Locale) {
  return localized[locale];
}

export type SiteFacts = ReturnType<typeof getSiteFacts>;
