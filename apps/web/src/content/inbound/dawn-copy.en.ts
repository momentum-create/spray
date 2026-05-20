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
    label: "FOR INTERNATIONAL GUESTS",
    cta: "Shop in English",
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
