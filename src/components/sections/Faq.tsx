import { Icon } from "@/components/ui/Icon";

/** Accessible FAQ using native <details>/<summary> (keyboard friendly, works without JS). */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-moss-900/10 rounded-2xl border border-moss-900/10 bg-white/70">
      {items.map((item) => (
        <details key={item.q} className="group px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-moss-950 [&::-webkit-details-marker]:hidden">
            <h3 className="text-base">{item.q}</h3>
            <Icon
              name="chevronDown"
              className="size-5 shrink-0 text-accent-600 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
