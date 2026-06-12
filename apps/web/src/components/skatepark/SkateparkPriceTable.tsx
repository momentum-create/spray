type PriceRow = {
  id: string;
  item: string;
  price: string;
  note?: string;
};

type SkateparkPriceTableProps = {
  title: string;
  lead?: string;
  rows: readonly PriceRow[];
  itemHeader: string;
  priceHeader: string;
};

export function SkateparkPriceTable({
  title,
  lead,
  rows,
  itemHeader,
  priceHeader,
}: SkateparkPriceTableProps) {
  const captionId = `price-table-${title.replace(/\s/g, "-")}`;

  return (
    <section aria-labelledby={captionId}>
      <h2 id={captionId} className="section-label mb-2">
        {title}
      </h2>
      {lead ? <p className="mb-3 text-sm text-spray-muted">{lead}</p> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-spray-border bg-spray-elevated">
              <th scope="col" className="px-4 py-3 text-left font-bold text-white">
                {itemHeader}
              </th>
              <th scope="col" className="px-4 py-3 text-left font-bold text-white">
                {priceHeader}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-spray-border">
                <td className="px-4 py-3 text-white">{row.item}</td>
                <td className="px-4 py-3 text-spray-muted">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
