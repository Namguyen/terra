import Link from "next/link";

/** Wordmark logo. Replace with the official logo file once available. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 rounded-md" aria-label="Terrafound — home">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" className={light ? "fill-cream-50" : "fill-moss-900"} />
        <path d="M7 22h18" strokeWidth="2.4" strokeLinecap="round" className="stroke-accent-500" />
        <path
          d="M9 18.5 14 11l3.5 4.5L20 13l3 5.5"
          fill="none"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={light ? "stroke-moss-900" : "stroke-cream-50"}
        />
      </svg>
      <span className={`text-xl font-extrabold tracking-tight ${light ? "text-cream-50" : "text-moss-950"}`}>
        Terra<span className={light ? "text-accent-300" : "text-accent-600"}>found</span>
      </span>
    </Link>
  );
}
