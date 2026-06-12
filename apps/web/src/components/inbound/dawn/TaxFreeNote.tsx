import { dawnCopy } from "@/content/inbound/dawn-copy.en";

type Props = {
  show?: boolean;
};

export function TaxFreeNote({ show = true }: Props) {
  if (!show) return null;

  return (
    <div className="mt-4 border border-[#e8e8e8] p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-black">
        {dawnCopy.product.taxFreeTitle}
      </p>
      <ol className="mt-3 list-decimal space-y-2 pl-4 text-xs leading-relaxed text-black/80">
        {dawnCopy.product.taxFreeSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="mt-3 text-xs font-medium leading-relaxed text-black">
        {dawnCopy.product.taxFreeNotEligible}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-black/55">{dawnCopy.product.taxFreeBody}</p>
    </div>
  );
}
