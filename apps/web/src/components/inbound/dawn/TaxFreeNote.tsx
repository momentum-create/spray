import { dawnCopy } from "@/content/inbound/dawn-copy.en";

export function TaxFreeNote() {
  return (
    <div className="mt-4 border border-[#e8e8e8] p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-black">
        {dawnCopy.product.taxFreeTitle}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-black/60">{dawnCopy.product.taxFreeBody}</p>
    </div>
  );
}
