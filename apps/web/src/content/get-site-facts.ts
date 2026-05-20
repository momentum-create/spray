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
        "Our experienced technicians tune your gear with care. Peak season gets busy, so please book maintenance early.",
      footerNote: "*Tune-up turnaround may take extra days depending on seasonal demand.",
      priceMenuLeft: [
        {
          name: "Base sanding",
          price: "¥6,600",
          description:
            "Machine sanding removes light scratches and oxidation from old, hardened bases. It refreshes glide, improves wax absorption, and sharpens running-edge contact.",
        },
        { name: "Side-edge sharpening", price: "¥3,300" },
        { name: "Side + base edge sharpening (rust removal)", price: "¥6,600" },
        { name: "Detune + wax", price: "¥7,700" },
        {
          name: "Hot wax",
          price: "",
          subItems: [
            { label: "Snowboard", price: "¥3,300" },
            { label: "Ski", price: "¥4,400" },
          ],
          note:
            "Used boards may require additional base/edge cleaning depending on condition. Extra fee from +¥2,200.",
        },
        { name: "Structure finish", price: "¥19,800〜" },
        {
          name: "Edge-shape tune",
          price: "",
          subItems: [
            { label: "Up to 150 cm", price: "¥17,600" },
            { label: "151–169 cm", price: "¥18,800" },
            { label: "170 cm and above", price: "¥22,000" },
          ],
          description:
            "Special package including nose/tail work, base-edge beveling, edge detune, base sanding, and SPRAY original thermo wax.",
        },
      ],
      priceMenuRight: [
        { name: "Boot lace / wire replacement", price: "¥4,400〜" },
        { name: "BOA dial replacement", price: "¥7,700〜" },
        {
          name: "Boot liner heat molding",
          price: "¥5,500〜",
          note: "Hard boots: ¥8,800",
        },
        {
          name: "Binding adjustment / setup",
          price: "¥4,400〜",
          note: "(Snowboard)",
        },
        { name: "Binding mount", price: "¥5,500", note: "(Ski)" },
        { name: "Skateboard assembly", price: "¥4,400" },
        { name: "Grip tape replacement", price: "¥3,300" },
      ],
      tuneUp: [
        {
          name: "Base sanding",
          description:
            "Lightly sands the base to remove scratches and oxidation, restoring glide and wax absorption.",
          price: "¥6,600",
        },
        {
          name: "Side-edge sharpening",
          description: "Sharpen side edges for better grip and control.",
          price: "¥3,300",
        },
        {
          name: "Detune + wax",
          description: "Detune finishing plus wax application.",
          price: "¥7,700",
        },
      ],
      labor: [
        {
          name: "Boot lace / wire replacement (per point)",
          description: "Boots are kept in-store because replacement takes time.",
          price: "¥4,400～",
        },
        {
          name: "BOA dial replacement",
          description: "Replacement of BOA dial components.",
          price: "¥7,700～",
        },
        {
          name: "Boot liner heat molding",
          description:
            "Approx. 30 min (15 min heating + 15 min molding). Please bring socks used for riding.",
          price: "¥5,500～",
          note: "Hard boots: ¥8,800",
        },
        {
          name: "Binding adjustment / setup (snowboard)",
          description: "Snowboard setup and angle/stance adjustment.",
          price: "¥4,400～",
        },
        {
          name: "Binding mount (ski)",
          description: "Ski binding mounting service.",
          price: "¥5,500",
        },
        {
          name: "Skateboard assembly",
          description: "Deck, truck, wheel and hardware assembly.",
          price: "¥4,400",
        },
        {
          name: "Grip tape replacement",
          description: "Replace skateboard deck grip tape.",
          price: "¥3,300",
        },
      ],
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
