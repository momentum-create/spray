import type { Copy } from "./copy.ja";

export const copy = {
  site: {
    name: "SPRAY",
    tagline: "Skate & snow shop in Asahikawa, Hokkaido",
    url: "https://www.spray166.com",
  },

  nav: {
    shop: { label: "ONLINE SHOP", sub: "Mega-menu" },
    park: { label: "SKATE PARK", sub: "Booking & Guide" },
    school: { label: "SCHOOL", sub: "Lessons" },
    maintenance: { label: "MAINTENANCE", sub: "Tune-up" },
    brands: { label: "BRANDS", sub: "List" },
    about: { label: "ABOUT US", sub: "Location, Calendar" },
  },

  cta: {
    park: "VISIT PARK / BOOK A SESSION",
    shop: "SHOP ONLINE (RAKUTEN, YAHOO, OFFICIAL STORE)",
    shopMobile: "ONLINE SHOP",
    bookPark: "Park hours & fees",
    maintenance: "Request service",
    firstTimers: "First-time visitors",
    viewCalendar: "View calendar",
    viewAllNews: "View all",
  },

  footer: {
    address:
      "1-8 Toyooka 12-jo 1-chome, Asahikawa, Hokkaido 078-8242, Japan",
    tel: "0166-33-2779",
    fax: "0166-34-7445",
    telLink: "tel:0166332779",
    hours: "Open 12:00–19:00 (closed Wednesdays)",
    copyright: (year: number) => `© ${year} SPRAY All Rights Reserved.`,
    privacy: "Privacy Policy",
  },

  home: {
    hero: {
      title: "PLAY ON SNOW,\nRIDE ON CONCRETE.",
      subtitle: "ENHANCED SPRAY INDOOR COURSE",
      indoorLabel: "ENHANCED SPRAY INDOOR COURSE",
    },
    ec: { heading: "NEW ARRIVALS" },
    categories: { snow: "Snowboard", skate: "Skateboard" },
    arrivals: {
      heading: "New arrivals",
      note: "Products and prices may vary by store.",
    },
    park: {
      heading: "Park today",
      status: {
        open: "Open",
        busy: "Busy",
        closed: "Closed to public",
      },
    },
    news: { heading: "NEWS" },
    brandsWeCarry: "BRANDS WE CARRY",
    staffAccess: "STAFF & ACCESS",
    boardMaintenance: "BOARD MAINTENANCE",
    tuneUpServices: "TUNE-UP & REPAIR SERVICES",
    requestMaintenance: "REQUEST MAINTENANCE",
    maintenanceLead:
      "Expert tune-ups for base, edges, and wax. Book early before peak season fills up.",
    viewMaintenancePage: "View maintenance page",
    maintenanceOverlayTitle: "MAINTENANCE",
    maintenanceOverlaySubtitle: "PRECISION CARE",
    skateParkAndSchool: "SKATE PARK & SCHOOL",
    parkOverlayTitle: "SKATE PARK",
    parkOverlaySubtitle: "ENHANCED SPRAY INDOOR COURSE",
    viewSkateparkPage: "View skate park page",
    parkQuick: {
      heading: "Skate park",
      hoursLabel: "Hours",
      priceLead: "Park fees are on our prices page (official chart).",
      calendar: "Calendar & availability",
      prices: "View price chart",
      firstTimers: "First-time visitors",
    },
    realTimeCalendar: "REAL-TIME CALENDAR",
    priceTable: "PRICE TABLE",
    firstTimersGuide: "FIRST TIMERS GUIDE",
    contactInfo: "CONTACT INFO",
    openingHours: "OPENING HOURS",
    social: "SOCIAL",
    shortcuts: {
      maintenance: "Board maintenance",
      firstTimers: "First-time visitors",
      brands: "All brands",
    },
    meta: {
      title: "SPRAY | Skate & snowboard shop & indoor park — Asahikawa",
      description:
        "Pro shop for skateboards and snowboards. Indoor skate park, lessons, and tune-ups. Ships nationwide via Rakuten, Yahoo, and our official store.",
    },
  },

  shop: {
    title: "Shop online",
    lead: "Browse and buy SPRAY products at your preferred store.",
    backHome: "← Home",
    malls: {
      rakuten: {
        name: "Rakuten Ichiba — SPRAY",
        feature: "Earn Rakuten points; sale events available.",
      },
      yahoo: {
        name: "Yahoo! Shopping — SPRAY",
        feature: "PayPay points on eligible items.",
      },
      official: {
        name: "Official Store",
        feature: "Full catalog and new arrivals. Register for updates.",
      },
    },
  },

  skatepark: {
    title: "Skate park",
    lead:
      "Indoor park loved in Asahikawa since 1998. About 580㎡ with a street-focused layout for all levels.",
    firstTimers: {
      title: "First-time visitors",
      lead:
        "Beginners welcome. Check what to bring and how your visit works, then come ride.",
      steps: [
        "Check in and pay admission",
        "Rules briefing with staff",
        "Ride the park — spectators welcome",
      ],
    },
    calendar: {
      title: "Hours & events calendar",
      lead:
        "Some days are private rentals or lessons only. Check before you visit.",
    },
    prices: {
      title: "Fees & hours",
      storeHours: "Shop hours",
      closedPrefix: "Closed",
      priceAlt: "Park admission & hours (official spray166.com chart)",
      priceCaption: "Source: spray166.com — park fee chart",
    },
    rules: { title: "Park rules & etiquette" },
    facility: { title: "Facility guide" },
    learnAtSchool: "Learn at school",
  },

  school: {
    title: "School",
    lead:
      "Lessons with pro staff — skateboard and snowboard, from basics to progression.",
    links: {
      lessons: "Lessons",
      camp: "Kids & camps",
      instructors: "Instructors",
    },
    booking: {
      title: "Book a lesson",
      lead: "Tell us your preferred date and goals. We will get back to you.",
    },
  },

  maintenance: {
    heroTitle: "PRECISION CARE:",
    heroSubtitle: "Expert Board Maintenance & Repair.",
    title: "Board maintenance",
    lead:
      "Our experienced team tunes your gear with care. Peak season gets busy — book service early!",
    tuneUpTitle: "TUNE UP",
    laborTitle: "Labor",
    sourceNote:
      "Prices and descriptions from spray166.com/board-maintenance/ and in-store menu board.",
    priceSheetAlt: "Tune-up & labor cost menu",
    table: {
      tuneUp: { process: "Service", detail: "Details", price: "Price" },
      labor: { process: "Service", detail: "Details", price: "Price" },
    },
    tabs: { snow: "Snowboard", skate: "Skateboard" },
    flow: {
      title: "SERVICE FLOW",
      steps: [
        { title: "Diagnosis", body: "Inspect board condition and recommend service." },
        { title: "Cleaning", body: "Remove dirt and old wax from base and edges." },
        { title: "Edging", body: "Tune side and base edges for grip and release." },
        { title: "Waxing", body: "Hot wax for glide and durability." },
        { title: "Finishing", body: "Final check before hand-off." },
      ],
    },
    request: {
      title: "Maintenance request",
      success: "Thank you. Our team will contact you.",
    },
  },

  brands: {
    title: "Brands",
    lead: "100+ brands — find yours at our online stores.",
    filters: { all: "All", snow: "Snowboard", skate: "Skateboard" },
    detailNote: "Brand details (logo & copy after CMS is connected).",
    shopAt: " — search",
    backToList: "← All brands",
  },

  about: {
    access: {
      title: "Access & contact",
      formNote: "For maintenance requests, please use the dedicated form.",
      storeInfo: "Store info",
      byCar: "By car",
      byBus: "By bus",
      fields: {
        address: "Address",
        phone: "Phone",
        fax: "FAX",
        hours: "Hours",
        closed: "Closed",
      },
      busTable: {
        stationDepart: "Depart station",
        stopArrive: "Arrive 10-22",
        stopDepart: "Depart 10-22",
        stationReturn: "Arrive station",
      },
    },
    staff: {
      title: "Staff",
      lead: "A team that lives skate and snow.",
    },
    story: {
      title: "About SPRAY",
      body:
        "SPRAY means to spread and reach further. We opened our first shop in Higashi-hikari, Asahikawa in 1996, and moved to Toyooka in July 1998 with an indoor skate park. We support riders through retail, the park, lessons, and maintenance.",
    },
    calendar: { title: "Store events & hours calendar" },
  },

  news: {
    title: "News",
    empty: "No posts yet.",
    back: "Back to list",
  },

  legal: {
    privacy: {
      title: "Privacy Policy",
      lead: "Full text will be published after legal review.",
    },
  },

  errors: {
    notFound: {
      title: "Page not found",
      body: "This page may have moved or been removed.",
      cta: "Back to home",
    },
  },

  ui: {
    lang: { label: "Language", ja: "日本語", en: "English" },
    table: { item: "Service", content: "Details", price: "Price (tax incl.)" },
    stub: { planned: "Coming soon" },
  },
} satisfies Copy;
