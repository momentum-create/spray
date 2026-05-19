type Row = {
  name: string;
  description?: string;
  price: string;
  note?: string;
};

type PriceTableProps = {
  title?: string;
  rows: Row[];
  labels?: { item: string; content: string; price: string };
};

export function PriceTable({ title, rows, labels }: PriceTableProps) {
  const head = labels ?? {
    item: "\u9805\u76ee",
    content: "\u5185\u5bb9",
    price: "\u4fa1\u683c\uff08\u7a0e\u8fbc\uff09",
  };

  return (
    <div className="overflow-x-auto">
      {title ? <h2 className="mb-4 text-xl font-bold">{title}</h2> : null}
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-spray-border bg-spray-surface">
            <th className="p-3 font-semibold">{head.item}</th>
            <th className="p-3 font-semibold">{head.content}</th>
            <th className="p-3 font-semibold whitespace-nowrap">{head.price}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-spray-border">
              <td className="p-3 align-top font-medium">{row.name}</td>
              <td className="p-3 align-top text-spray-muted">
                {row.description}
                {row.note ? (
                  <p className="mt-2 text-xs text-spray-muted">{row.note}</p>
                ) : null}
              </td>
              <td className="p-3 align-top whitespace-nowrap">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
