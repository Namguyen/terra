/** Conversational FAQ on native <details>/<summary> (keyboard friendly, works without JS). */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-b border-rule">
      {items.map((item) => (
        <details key={item.q} className="group border-t border-rule">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-lg py-lg [&::-webkit-details-marker]:hidden">
            <h3 className="font-body text-md font-medium tracking-normal normal-case">{item.q}</h3>
            <span
              aria-hidden="true"
              className="font-display text-xl leading-none text-accent transition-transform duration-[var(--dur-short)] ease-out group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[62ch] pb-lg text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
