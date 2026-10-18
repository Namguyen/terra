/** Small visible marker for content that must be replaced with real data before launch. */
export function PlaceholderNote({ children, tone = "dark" }: { children: string; tone?: "dark" | "light" }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1 text-xs ${
        tone === "light" ? "border-cream-50/30 text-cream-200" : "border-earth-300 text-earth-700"
      }`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-500" />
      {children}
    </p>
  );
}
