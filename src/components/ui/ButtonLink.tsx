import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  outline: "text-ink ring-1 ring-inset ring-rule hover:ring-ink-2",
};

/** Rectangular button voice (design.md § CTA voice). Single-line at every width. */
export const buttonClasses = (variant: Variant = "primary", className = "") =>
  `inline-flex items-center justify-center gap-xs whitespace-nowrap rounded-xs px-lg py-sm font-medium transition-[background-color,box-shadow,transform] duration-[var(--dur-micro)] ease-out hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 ${variants[variant]} ${className}`;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  );
}

/** C3 typographic link: words, an arrow, a 1px underline that turns accent on hover. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-xs whitespace-nowrap text-ink underline decoration-rule decoration-1 underline-offset-[0.35em] hover:decoration-accent hover:decoration-2 ${className}`}
    >
      {children}
      <Icon
        name="arrowRight"
        className="size-4 transition-transform duration-[var(--dur-short)] ease-out group-hover:translate-x-2xs"
      />
    </Link>
  );
}
