import { notFound } from "next/navigation";
import { TuneUpBookingForm } from "@/components/inbound/dawn/TuneUpBookingForm";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";
import { isInboundShopifyPocEnabled } from "@/lib/inbound/flags";
import { resolveLocale } from "@/i18n/page";

type PageProps = { params: Promise<{ locale: string }> };

export const metadata = {
  title: "Book a tune-up | SPRAY",
};

export default async function TuneUpBookingPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  if (!isInboundShopifyPocEnabled() || locale !== "en") notFound();

  return (
    <div className="mx-auto max-w-xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="text-3xl font-medium text-black">{dawnCopy.tuneUp.title}</h1>
      <p className="mt-3 text-sm text-black/70">{dawnCopy.tuneUp.subtitle}</p>
      <div className="mt-10">
        <TuneUpBookingForm />
      </div>
    </div>
  );
}
