import Link from "next/link";

/** Typographic wordmark — stands in for a logo until a trademarked mark exists. */
export function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="Terrafound — home"
      className="font-display text-lg font-extrabold tracking-[0.08em] whitespace-nowrap text-ink uppercase"
    >
      Terrafound
    </Link>
  );
}
