/** F3 ledger: hairline-ruled rows, name left, explanation right. Replaces icon-card grids. */
export function Ledger({ items, className = "" }: { items: { title: string; body: string }[]; className?: string }) {
  return (
    <dl className={`border-b border-rule ${className}`}>
      {items.map((item) => (
        <div key={item.title} className="grid gap-xs border-t border-rule py-lg md:grid-cols-12 md:gap-lg">
          <dt className="font-display text-lg font-extrabold tracking-[0.01em] uppercase md:col-span-5">{item.title}</dt>
          <dd className="max-w-[60ch] text-ink-2 md:col-span-7">{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}
