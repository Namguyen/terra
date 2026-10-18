import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold tracking-[0.18em] uppercase ${light ? "text-accent-300" : "text-accent-600"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={`text-3xl leading-tight sm:text-4xl ${light ? "text-cream-50" : "text-moss-950"}`}
      >
        {title}
      </Heading>
      {subtitle ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-cream-200" : "text-muted"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
