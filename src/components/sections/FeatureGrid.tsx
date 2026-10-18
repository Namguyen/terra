import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

type Item = { title: string; body: string };

type FeatureGridProps = {
  items: Item[];
  icons?: IconName[];
  columns?: 2 | 3 | 4;
  /** Tailwind classes for the icon badge, e.g. "bg-ai-soft text-ai" */
  iconTone?: string;
  variant?: "card" | "plain";
};

const cols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Grid of icon + title + text items. Headings are h3 (sections own the h2). */
export function FeatureGrid({
  items,
  icons,
  columns = 3,
  iconTone = "bg-accent-100 text-accent-700",
  variant = "card",
}: FeatureGridProps) {
  return (
    <ul className={`grid gap-5 ${cols[columns]}`}>
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.title}
          delay={i * 70}
          className={
            variant === "card"
              ? "rounded-2xl border border-moss-900/10 bg-white/70 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-moss-950/5"
              : "border-t border-moss-900/15 pt-6"
          }
        >
          {icons?.[i] ? (
            <span className={`inline-flex size-11 items-center justify-center rounded-xl ${iconTone}`}>
              <Icon name={icons[i]} />
            </span>
          ) : null}
          <h3 className={`text-lg font-semibold ${icons?.[i] ? "mt-5" : ""}`}>{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}
