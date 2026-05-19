import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { getCopy } from "@/i18n/get-copy";
import { resolveLocale } from "@/i18n/page";
import { designAssets } from "@/lib/design-assets";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SkateparkPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const copy = getCopy(locale);

  const links = [
    { href: "/skatepark/facility", label: copy.skatepark.facility.title },
    { href: "/skatepark/prices", label: copy.skatepark.prices.title },
    { href: "/skatepark/calendar", label: copy.skatepark.calendar.title },
    { href: "/skatepark/rules", label: copy.skatepark.rules.title },
    { href: "/skatepark/first-timers", label: copy.skatepark.firstTimers.title },
  ] as const;

  return (
    <>
      <section className="relative min-h-[300px] border-b border-spray-border">
        <Image
          src={designAssets.skateparkHero}
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-site px-4 py-16 md:px-6">
          <h1 className="max-w-2xl font-display text-2xl font-black uppercase text-white md:text-4xl">
            UNLEASH YOUR RIDE: Enhanced Skate Park & Lessons.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/80">{copy.skatepark.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LocaleLink href="/skatepark/prices" locale={locale} className="btn-park">
              {copy.cta.bookPark}
            </LocaleLink>
            <LocaleLink href="/shop" locale={locale} className="btn-shop-outline">
              {copy.cta.shop}
            </LocaleLink>
          </div>
        </div>
      </section>

      <nav className="mx-auto grid max-w-site gap-3 px-4 py-10 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
        {links.map((l) => (
          <LocaleLink
            key={l.href}
            href={l.href}
            locale={locale}
            className="card-dark px-6 py-4 text-sm font-bold uppercase tracking-wider hover:border-spray-orange"
          >
            {l.label}
          </LocaleLink>
        ))}
      </nav>
    </>
  );
}
