import type { SiteFacts } from "@/content/get-site-facts";

type MenuItem = SiteFacts["maintenance"]["priceMenuLeft"][number];

type Props = {
  title: string;
  leftTitle: string;
  rightTitle: string;
  left: readonly MenuItem[];
  right: readonly MenuItem[];
  footerNote: string;
};

function MenuItemBlock({ item }: { item: MenuItem }) {
  const hasMainPrice = Boolean(item.price);

  return (
    <article className="maintenance-menu-item">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="maintenance-menu-item-title text-base font-bold text-white md:text-lg">
          {item.name}
        </h3>
        {hasMainPrice ? (
          <span className="shrink-0 text-lg font-black tabular-nums text-spray-orange md:text-xl">
            {item.price}
          </span>
        ) : null}
      </div>

      {"subItems" in item && item.subItems?.length ? (
        <ul className="mt-2 space-y-1.5 border-l-2 border-spray-orange/40 pl-3">
          {item.subItems.map((sub) => (
            <li key={sub.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-white/85">{sub.label}</span>
                <span className="shrink-0 font-bold tabular-nums text-spray-orange">
                  {sub.price}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {"description" in item && item.description ? (
        <p className="mt-2 text-[13px] leading-relaxed text-white/75">{item.description}</p>
      ) : null}

      {"note" in item && item.note ? (
        <p className="mt-2 text-[12px] leading-relaxed text-spray-muted">{item.note}</p>
      ) : null}
    </article>
  );
}

export function MaintenancePriceMenu({
  title,
  leftTitle,
  rightTitle,
  left,
  right,
  footerNote,
}: Props) {
  return (
    <section
      className="maintenance-price-menu relative overflow-hidden border border-spray-border"
      aria-labelledby="maintenance-price-menu-title"
    >
      <div className="maintenance-price-menu-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative px-4 py-8 md:px-8 md:py-10">
        <h2
          id="maintenance-price-menu-title"
          className="mb-8 text-center font-display text-xl font-black tracking-tight text-white md:text-2xl lg:text-3xl"
        >
          {title}
        </h2>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="mb-4 border-l-4 border-spray-orange pl-3 text-sm font-bold uppercase tracking-widest text-white">
              {leftTitle}
            </p>
            <div className="space-y-6">
              {left.map((item) => (
                <MenuItemBlock key={item.name} item={item} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 border-l-4 border-spray-orange pl-3 text-sm font-bold uppercase tracking-widest text-white">
              {rightTitle}
            </p>
            <div className="space-y-6">
              {right.map((item) => (
                <MenuItemBlock key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-right text-[12px] text-spray-muted md:text-sm">{footerNote}</p>
      </div>
    </section>
  );
}
