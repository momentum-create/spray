import { dawnCopy } from "@/content/inbound/dawn-copy.en";

export function BopisPickup() {
  return (
    <div className="flex items-start gap-2 rounded-sm border border-[#e8e8e8] bg-[#f9f9f9] px-3 py-3 text-sm text-black">
      <span className="mt-0.5 shrink-0 font-bold text-[#108043]" aria-hidden>
        ✓
      </span>
      <span>{dawnCopy.product.bopis}</span>
    </div>
  );
}
