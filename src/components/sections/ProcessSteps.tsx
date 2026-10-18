import { Reveal } from "@/components/ui/Reveal";

type ProcessStepsProps = {
  steps: { title: string; body: string }[];
  /** Tailwind classes for the step number badge */
  tone?: string;
};

/** Numbered timeline — vertical on mobile, horizontal on large screens. */
export function ProcessSteps({ steps, tone = "bg-accent-600 text-white" }: ProcessStepsProps) {
  return (
    <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
      {/* connecting line */}
      <span
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-5 w-px bg-moss-900/15 lg:top-5 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto"
      />
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 90} className="relative flex gap-5 lg:flex-col lg:gap-4">
          <span
            className={`relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-4 ring-cream-50 ${tone}`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
