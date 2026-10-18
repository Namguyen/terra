import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@content/site";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/sections/PageIntro";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactFormWithParams } from "@/components/forms/ContactFormWithParams";

const t = copy.contact;

export const metadata: Metadata = buildMetadata({ route: "contact", title: t.meta.title, description: t.meta.description });

/* Hallmark · utility page · design-system: design.md · designed-as-app */
export default function ContactPage() {
  return (
    <>
      <PageIntro title={t.hero.title} subtitle={t.hero.subtitle} />

      <section className="py-3xl">
        <Container className="grid gap-2xl lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl">{t.formTitle}</h2>
            <div className="mt-xl">
              {/* Fallback renders the same form without URL pre-fill during static rendering */}
              <Suspense fallback={<LeadForm kind="contact" t={copy.form} />}>
                <ContactFormWithParams t={copy.form} />
              </Suspense>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-2xl">{t.info.title}</h2>
            <dl className="mt-xl border-b border-rule">
              <div className="grid gap-2xs border-t border-rule py-md">
                <dt className="text-xs text-muted uppercase">{t.info.address}</dt>
                <dd>
                  <address className="not-italic">{site.address}</address>
                  <span className="tnum mt-2xs block font-mono text-xs text-muted">{copy.home.map.coords}</span>
                </dd>
              </div>
              <div className="grid gap-2xs border-t border-rule py-md">
                <dt className="text-xs text-muted uppercase">{t.info.email}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="underline decoration-rule underline-offset-[0.35em] hover:decoration-accent">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
            <iframe
              title={t.info.mapTitle}
              src={site.mapEmbedUrl}
              className="mt-xl block aspect-[4/3] w-full border border-rule grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </aside>
        </Container>
      </section>
    </>
  );
}
