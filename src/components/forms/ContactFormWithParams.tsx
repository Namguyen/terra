"use client";

import { useSearchParams } from "next/navigation";
import type { Copy } from "@content/copy";
import { interests } from "@/lib/validation";
import { LeadForm } from "./LeadForm";

/**
 * Contact form pre-filled from the URL, e.g.
 *   /contact?interest=ai
 *   /contact?interest=trading&product=Steel%20pipes
 * Lets the page stay static while CTAs across the site can deep-link into the form.
 */
export function ContactFormWithParams({ t }: { t: Copy["form"] }) {
  const params = useSearchParams();
  const interestParam = params.get("interest") ?? "";
  const product = params.get("product");

  const interest = (interests as readonly string[]).includes(interestParam) ? interestParam : "";
  const message = product ? t.prefillProduct.replace("{product}", product.slice(0, 200)) : "";

  // `key` re-mounts the form if the query changes while on the page
  return <LeadForm key={`${interest}|${product ?? ""}`} kind="contact" t={t} initial={{ interest, message }} />;
}
