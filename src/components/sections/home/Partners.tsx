import { copy } from "@content/copy";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Replace with real partner logos (e.g. next/image with files in /public/images/partners). */
const partnerPlaceholders = ["Partner A", "Partner B", "Partner C", "Partner D", "Partner E", "Partner F"];

export function Partners() {
  const t = copy.home.partners;
  return (
    <section className="border-y border-moss-900/10 py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} align="center" />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partnerPlaceholders.map((name) => (
            <li
              key={name}
              className="flex h-20 items-center justify-center rounded-xl border border-dashed border-moss-900/20 text-sm font-semibold tracking-wide text-moss-700 grayscale transition-colors hover:border-moss-900/40 hover:text-moss-950"
            >
              <span>[ {name} ]</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <PlaceholderNote>{t.note}</PlaceholderNote>
        </div>
      </Container>
    </section>
  );
}
