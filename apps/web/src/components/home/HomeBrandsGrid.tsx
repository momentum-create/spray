import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";
import { brandLogos } from "@/content/brand-logos";

type Props = {
  locale: Locale;
  copy: Copy;
};

/** BRANDS WE CARRY — spray166.com/page-99/ のロゴ一覧 */
export function HomeBrandsGrid({ locale, copy }: Props) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="section-label">{copy.home.brandsWeCarry}</h2>
        <LocaleLink
          href="/brands"
          locale={locale}
          className="text-[10px] font-bold uppercase tracking-wider text-spray-orange hover:underline"
        >
          {copy.home.shortcuts.brands}
        </LocaleLink>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {brandLogos.map((brand) => {
          const tileClass =
            "flex aspect-square items-center justify-center border border-spray-border bg-white p-2 transition hover:border-spray-orange";
          const image = (
            <Image
              src={brand.image}
              alt={brand.name}
              width={80}
              height={80}
              className="max-h-full max-w-full object-contain"
            />
          );

          if ("shopUrl" in brand && brand.shopUrl) {
            return (
              <a
                key={brand.slug}
                href={brand.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClass}
                title={brand.name}
              >
                {image}
              </a>
            );
          }

          return (
            <LocaleLink
              key={brand.slug}
              href="/brands"
              locale={locale}
              className={tileClass}
              title={brand.name}
            >
              {image}
            </LocaleLink>
          );
        })}
      </div>
    </section>
  );
}
