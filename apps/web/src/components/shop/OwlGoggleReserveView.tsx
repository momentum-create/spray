import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { OwlGoggleReserveForm } from "@/components/forms/OwlGoggleReserveForm";
import type { Locale } from "@/i18n/config";
import type { Copy } from "@/i18n/get-copy";

const DESIGN_SHEET = "/images/owl-goggle/design-sheet-flow-vent.png";
const STRAP_SHEET = "/images/owl-goggle/strap-spec-sheet.png";

type Props = { locale: Locale; copy: Copy };

function ModelCard({
  modelKey,
  copy,
}: {
  modelKey: "flow" | "vent";
  copy: Copy;
}) {
  const o = copy.owlGoggle;
  const m = o.models[modelKey];
  const refUrl = o.refUrls[modelKey];

  return (
    <article className="flex flex-col border border-spray-border bg-spray-surface">
      <div className="border-b border-spray-border p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-spray-orange">{m.name}</p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-spray-text">{m.variant}</h3>
        <p className="mt-2 text-sm text-spray-muted">{m.tagline}</p>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm leading-relaxed text-spray-muted">{m.desc}</p>
        <ul className="mt-4 flex-1 list-disc space-y-1 pl-5 text-sm text-spray-muted">
          {m.features.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="#reserve" className="btn-park inline-flex min-h-11 items-center px-4 text-sm">
            {o.form.cta}
          </a>
          <a
            href={refUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-xs text-spray-blue hover:underline"
          >
            {m.refLabel} →
          </a>
        </div>
      </div>
    </article>
  );
}

function SpecImage({
  src,
  alt,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="overflow-hidden border border-spray-border bg-white">
      <div className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="h-auto w-full"
          sizes="(max-width: 960px) 100vw, 960px"
          priority={priority}
        />
      </div>
      <figcaption className="border-t border-spray-border bg-spray-surface px-4 py-2 text-center text-xs text-spray-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

export function OwlGoggleReserveView({ locale, copy }: Props) {
  const o = copy.owlGoggle;
  const telLink = copy.footer.telLink;
  const tel = copy.footer.tel;

  return (
    <>
      <section className="border-b border-spray-border bg-[#001c2c] text-white">
        <div className="container-page py-10 md:py-12">
          <div className="max-w-2xl">
            <span className="inline-block border border-white/30 px-3 py-1 text-xs font-bold uppercase tracking-widest">
              {o.hero.badge}
            </span>
            <h1 className="mt-4 whitespace-pre-line font-display text-3xl font-black md:text-4xl">
              {o.hero.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/80">{o.hero.lead}</p>
            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-bold">{o.price}</p>
              <p className="text-sm text-white/60">{o.priceNote}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-spray-orange">{o.delivery}</p>
            <a href="#reserve" className="btn-park mt-6 inline-flex min-h-12 items-center px-6">
              {o.form.title}
            </a>
          </div>
        </div>
      </section>

      <div className="container-page space-y-14 py-12">
        <section>
          <h2 className="section-label mb-2">{o.design.sheetCaption}</h2>
          <p className="mb-4 max-w-2xl text-sm text-spray-muted">{o.design.lead}</p>
          <SpecImage
            src={DESIGN_SHEET}
            alt={o.images.designSheetAlt}
            caption={o.design.sheetCaption}
            priority
          />
        </section>

        <section>
          <h2 className="section-label mb-4">Flow / Vent</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ModelCard modelKey="flow" copy={copy} />
            <ModelCard modelKey="vent" copy={copy} />
          </div>
        </section>

        <section>
          <h2 className="section-label mb-2">{o.strap.title}</h2>
          <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-spray-muted">
            {o.strap.specs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <SpecImage
            src={STRAP_SHEET}
            alt={o.images.strapSheetAlt}
            caption={o.strap.sheetCaption}
          />
        </section>

        <section className="border border-amber-300 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-950">{o.notices.title}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-amber-950/90">
            {o.notices.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="reserve" className="scroll-mt-24 border border-spray-border bg-[#001c2c] p-6 md:p-8">
          <h2 className="text-xl font-bold text-white">{o.form.title}</h2>
          <p className="mt-2 text-sm text-white/70">{o.form.lead}</p>
          <div className="mt-6">
            <OwlGoggleReserveForm locale={locale} copy={copy} />
          </div>
        </section>

        <section>
          <h2 className="section-label mb-4">{o.faq.title}</h2>
          <dl className="space-y-4">
            {o.faq.items.map((item) => (
              <div key={item.q} className="border border-spray-border bg-spray-surface p-4">
                <dt className="font-bold text-spray-text">{item.q}</dt>
                <dd className="mt-2 text-sm text-spray-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="text-sm text-spray-muted">
          <LocaleLink href="/shop" locale={locale} className="text-spray-blue hover:underline">
            {o.backShop}
          </LocaleLink>
          {" · "}
          <a href={telLink} className="text-spray-blue hover:underline">
            {tel}
          </a>
        </p>
      </div>
    </>
  );
}
