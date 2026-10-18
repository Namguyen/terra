import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@content/site";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactFormWithParams } from "@/components/forms/ContactFormWithParams";

const t = copy.contact;

export const metadata: Metadata = buildMetadata({ route: "contact", title: t.meta.title, description: t.meta.description });

export default function ContactPage() {

  const details: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "pin", label: t.info.address, value: site.address },
    { icon: "mail", label: t.info.email, value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <PageHero eyebrow={t.hero.eyebrow} title={t.hero.title} subtitle={t.hero.subtitle} />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="rounded-3xl border border-moss-900/10 bg-white/70 p-6 sm:p-10 lg:col-span-7">
            <h2 className="text-2xl">{t.formTitle}</h2>
            <div className="mt-8">
              {/* Fallback renders the same form without URL pre-fill during static rendering */}
              <Suspense fallback={<LeadForm kind="contact" t={copy.form} />}>
                <ContactFormWithParams t={copy.form} />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl bg-moss-900 p-6 text-cream-100 sm:p-8">
              <h2 className="text-xl text-cream-50">{t.info.title}</h2>
              <dl className="mt-6 space-y-5">
                {details.map((d) => (
                  <div key={d.label} className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-cream-50/10 text-accent-300">
                      <Icon name={d.icon} className="size-5" />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-cream-300 uppercase">{d.label}</dt>
                      <dd className="mt-1 text-sm">
                        {d.href ? (
                          <a href={d.href} className="hover:text-accent-300">
                            {d.value}
                          </a>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="overflow-hidden rounded-3xl border border-moss-900/10 bg-cream-200">
              <iframe
                title={t.info.mapTitle}
                src={site.mapEmbedUrl}
                className="block aspect-[4/3] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
