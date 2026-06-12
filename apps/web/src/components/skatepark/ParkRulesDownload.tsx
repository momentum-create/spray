import type { Copy } from "@/i18n/get-copy";

type Props = { copy: Copy };

export function ParkRulesDownload({ copy }: Props) {
  const r = copy.skatepark.rules;

  return (
    <div className="mb-8 rounded border border-spray-border bg-spray-surface p-6">
      <h2 className="text-lg font-bold text-white">{r.pdfTitle}</h2>
      <p className="mt-2 text-sm text-spray-muted">{r.pdfLead}</p>
      <a
        href="/documents/skatepark-rules.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        type="application/pdf"
        className="btn-park mt-4 inline-flex min-h-11 items-center px-4"
      >
        {r.pdfDownload}
      </a>
    </div>
  );
}
