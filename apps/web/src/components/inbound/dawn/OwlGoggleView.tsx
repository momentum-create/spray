import Image from "next/image";
import Link from "next/link";
import { OwlGoggleBuyBox } from "@/components/inbound/dawn/OwlGoggleBuyBox";
import { owlGoggleEn } from "@/content/inbound/owl-goggle.en";

const DESIGN_SHEET = "/images/owl-goggle/design-sheet-flow-vent.png";
const STRAP_SHEET = "/images/owl-goggle/strap-spec-sheet.png";

export function OwlGoggleView() {
  return (
    <div className="dawn-product-page mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
      <nav className="mb-8 text-xs text-black/50">
        <Link href="/en/products" className="hover:underline">
          Shop
        </Link>
        {" / "}
        <Link href="/en/products/categories/goggles" className="hover:underline">
          Goggles
        </Link>
        {" / "}
        <span className="text-black/70">SPRAY × OWL Pre-order</span>
      </nav>

      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-black/45">
        SPRAY × OWL OPTICAL — Limited strap design
      </p>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <figure className="overflow-hidden border border-[#e8e8e8] bg-white">
            <Image
              src={DESIGN_SHEET}
              alt="Flow and Vent design specification"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
            <figcaption className="border-t border-[#e8e8e8] px-4 py-2 text-center text-xs text-black/50">
              Design specification (Flow / Vent)
            </figcaption>
          </figure>
          <figure className="overflow-hidden border border-[#e8e8e8] bg-white">
            <Image
              src={STRAP_SHEET}
              alt="Strap specification"
              width={1600}
              height={900}
              className="h-auto w-full"
            />
            <figcaption className="border-t border-[#e8e8e8] px-4 py-2 text-center text-xs text-black/50">
              Strap specification sheet
            </figcaption>
          </figure>
        </div>

        <div className="dawn-product-info w-full min-w-0">
          <OwlGoggleBuyBox />
        </div>
      </div>

      <section className="dawn-product-details mt-12 border-t border-[#e8e8e8] pt-10 lg:mt-16">
        <h2 className="text-base font-medium text-black">Design</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-black/80">{owlGoggleEn.designLead}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {(["flow", "vent"] as const).map((key) => {
            const m = owlGoggleEn[key];
            return (
              <article key={key} className="border border-[#e8e8e8] p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-black/45">{m.name}</p>
                <h3 className="mt-1 text-lg font-medium text-black">{m.fullName}</h3>
                <p className="mt-2 text-sm text-black/60">{m.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/75">{m.desc}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-black/65">
                  {m.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <h2 className="mt-10 text-base font-medium text-black">Strap specification</h2>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-black/75">
          {owlGoggleEn.strapSpecs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-center text-[11px] text-black/40">
        <Link href="/en/products" className="underline hover:text-black">
          ← Back to shop home
        </Link>
      </p>
    </div>
  );
}
