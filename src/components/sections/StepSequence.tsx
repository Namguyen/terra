/** F4 step sequence: genuinely ordinal stages, numbered 1.0 → n.0. */
export function StepSequence({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="border-b border-rule">
      {steps.map((step, i) => (
        <li key={step.title} className="grid gap-xs border-t border-rule py-xl md:grid-cols-12 md:gap-lg">
          <span aria-hidden="true" className="tnum font-display text-3xl font-extrabold text-muted md:col-span-2">
            {i + 1}.0
          </span>
          <h3 className="text-xl md:col-span-4">{step.title}</h3>
          <p className="max-w-[55ch] text-ink-2 md:col-span-6">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
