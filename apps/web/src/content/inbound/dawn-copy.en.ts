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
    taxFreeTitle: "Tax-free shopping (visitors to Japan)",
    taxFreeBody:
      "Eligible international visitors may claim tax exemption in store with passport. Online prices shown include Japanese consumption tax. Customs duties and import fees may apply for overseas shipping.",
    shippingNote:
      "International shipping fees and customs are not included in the listed price. Contact us for estimates.",
    bopis:
      "Pickup available at SPRAY Asahikawa (Usually ready in 24 hours)",
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
    pickup: "Store pickup — Asahikawa",
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
