export const dawnCopy = {
  nav: {
    shop: "Shop",
    tuneUp: "Book tune-up",
    visit: "Visit store",
    mainSite: "Japanese site",
  },
  product: {
    addToCart: "Add to cart",
    buyNow: "Buy it now",
    preOrder: "Pre-order",
    taxFreeTitle: "Tax-free pickup — step by step",
    taxFreeSteps: [
      "Place your order online. Prices shown include 10% Japanese consumption tax. Select store pickup at SPRAY Asahikawa.",
      "When your order is ready, collect it at the shop during opening hours only (12:00–19:00, closed Wednesdays). At the counter, bring (1) your passport — original document, not a photo or copy — and (2) your order confirmation email (on your phone or printed).",
      "Tell staff you want tax-free (duty-free) and show your passport. We check it at the counter. Tax-free cannot be applied if you do not bring your passport in person.",
      "If you qualify as a non-resident visitor, we process the tax-free record at pickup. You complete the consumption tax refund at airport customs when you depart Japan (Japan refund method).",
    ] as const,
    taxFreeNotEligible:
      "Not eligible for tax-free: delivery to a hotel or any address in Japan, or any order not collected in person with passport verification at our store.",
    taxFreeBody:
      "Domestic shipping within Japan is always tax-inclusive (no tax-free). International shipping quotes are separate; import duties in your country are not included.",
    shippingNotePickup:
      "Store pickup at SPRAY Asahikawa, 1-8 Toyooka 12-jo 1-chome — shop hours only (12:00–19:00, closed Wednesdays). For tax-free, follow the steps above and bring your passport.",
    shippingNoteDomestic:
      "Domestic shipping within Japan only. Shipping fee and delivery timing are confirmed by email after order (demo). Not eligible for tax-free.",
    bopis:
      "Store pickup at SPRAY Asahikawa — collection during shop hours only (12:00–19:00, closed Wednesdays). Want tax-free? Bring your passport to the counter — see steps below.",
    domesticShippingSelected:
      "Domestic shipping to a Japan address. Prices are tax-inclusive (10% JP tax) — not eligible for tax-free. We will contact you to confirm shipping fee and delivery.",
    viewOfficial: "View on GENTEMSTICK official store",
    reviews: (n: number) => `${n} review${n === 1 ? "" : "s"}`,
  },
  cart: {
    title: "Your cart",
    empty: "Your cart is empty",
    checkout: "Checkout",
    continue: "Continue shopping",
    added: "Added to cart",
  },
  fulfillment: {
    title: "Delivery method",
    storePickup: "Store pickup",
    storePickupNote:
      "Collect at SPRAY Asahikawa (12:00–19:00, closed Wednesdays). Passport required for tax-free.",
    domesticShipping: "Domestic shipping",
    domesticShippingNote:
      "Delivery to an address in Japan only. Tax-inclusive — not eligible for tax-free.",
    tuneUpRequiresPickup: "Tune-up add-ons are available with store pickup only.",
    noInternational: "International shipping is not available on this English shop.",
    labelStorePickup: "Store pickup",
    labelDomesticShipping: "Domestic shipping (Japan)",
  },
  dateField: {
    month: "Month",
    day: "Day",
    year: "Year",
  },
  tuneUp: {
    title: "Book a pro tune-up",
    subtitle: "Drop off at SPRAY Asahikawa — English support available",
    dropOff: "Drop-off date",
    pickUp: "Pick-up date (requested)",
    note: "Please bring your board to SPRAY Asahikawa on your selected drop-off date.",
    submit: "Request booking",
    success: "Request received (demo). We will contact you to confirm.",
  },
  checkout: {
    title: "Checkout",
    express: "Express checkout",
    subtotal: "Subtotal",
    pickup: "Store pickup — Asahikawa (12:00–19:00, closed Wed · passport for tax-free)",
    domesticShipping: "Domestic shipping — Japan address (tax-inclusive, not tax-free)",
    mixedFulfillment:
      "Your cart includes both store pickup and domestic shipping. Each line is fulfilled as selected on the product page.",
    total: "Total",
    pay: "Complete order (demo)",
    demoNote: "This is a presentation demo. No payment is processed.",
  },
  banner: {
    label: "GENTEMSTICK · English shop demo",
    body: "5 pre-order boards, cart & checkout demo, tune-up booking — not the full online mall.",
    cta: "Browse boards",
  },
  shopHome: {
    badge: "Digital-first shop",
    heroA: "SPRAY",
    heroB: "SNOW",
    heroC: "SHOP",
    lead: "Browse by brand or category. Board collections, tune-up booking, and store pickup in one English storefront.",
    ctaBrands: "All brands",
    ctaCategories: "Shop by category",
    sectionLabel: "How to browse",
    sectionTitle: "Brands first, or start from the gear you need.",
    sectionBody:
      "Pick a brand for curated collections, or filter by snowboard and skateboard to narrow the lineup.",
    cardBrands: "Brand list",
    cardCategories: "Item categories",
    featuredLabel: "Featured collection",
    featuredTitle: "GENTEMSTICK boards",
    featuredBody: "Five demo boards with cart, checkout, and BOPIS — our Shopify-style proof of concept.",
    featuredCta: "View collection →",
  },
  shopBrands: {
    title: "Brands",
    lead: "Select a brand to open its shop page or official collection.",
    back: "← Shop home",
  },
  shopCategories: {
    title: "Categories",
    lead: "Choose a product type, then browse related brands.",
    back: "← Shop home",
    stepLead: "Brands in this category — open a brand page to shop.",
    backCategories: "← All categories",
  },
  shopBrand: {
    back: "← All brands",
    placeholder:
      "Full brand page coming soon. Browse this brand on our official online store.",
    officialCta: "Official store",
    gentemCta: "View GENTEMSTICK collection",
  },
} as const;

export const tuneUpCourses = [
  {
    id: "wax",
    name: "Premium Powder Wax Service",
    priceJpy: 8_800,
    description: "Hot wax, edge touch-up, base clean.",
  },
  {
    id: "full",
    name: "Full Pro Tune-up",
    priceJpy: 15_400,
    description: "Structure-ready base work, edge tune, premium wax.",
  },
] as const;
