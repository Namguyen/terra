import { NextResponse } from "next/server";
import { emptyLead, validateLead, type FormKind, type LeadPayload } from "@/lib/validation";

const kinds: FormKind[] = ["contact", "sourcing"];

/**
 * Handles all lead forms (contact, quote request, AI consultation booking, sourcing request).
 * Currently a MOCK: it validates and logs the submission to the server console.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const kind = kinds.includes(body.kind as FormKind) ? (body.kind as FormKind) : null;
  if (!kind) return NextResponse.json({ ok: false, error: "invalid_kind" }, { status: 400 });

  // Keep only known string fields
  const lead = emptyLead(kind);
  for (const key of Object.keys(lead) as (keyof LeadPayload)[]) {
    if (key !== "kind" && typeof body[key] === "string") lead[key] = (body[key] as string).trim();
  }

  // Honeypot filled → pretend success so bots don't retry
  if (lead.website) return NextResponse.json({ ok: true });

  const errors = validateLead(lead);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 422 });
  }

  const submission = {
    ...lead,
    website: undefined,
    receivedAt: new Date().toISOString(),
  };

  console.log("[lead] New submission:", JSON.stringify(submission, null, 2));

  // ---------------------------------------------------------------------------
  // TODO: Deliver the lead. Options:
  //   1. Email via Resend:
  //        import { Resend } from "resend";
  //        const resend = new Resend(process.env.RESEND_API_KEY);
  //        await resend.emails.send({
  //          from: "Terrafound Website <noreply@terrafound.example>",
  //          to: process.env.CONTACT_INBOX!,
  //          replyTo: lead.email,
  //          subject: `[${kind}] ${lead.interest || lead.product} — ${lead.name}`,
  //          text: JSON.stringify(submission, null, 2),
  //        });
  //   2. SMTP via nodemailer (company mail server / Google Workspace).
  //   3. Push to a CRM (HubSpot, Zoho, Odoo…) or a Google Sheet webhook.
  // Also consider rate limiting (e.g. Upstash Ratelimit) and a CAPTCHA (Cloudflare Turnstile).
  // ---------------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
