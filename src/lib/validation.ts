/**
 * Shared validation for all lead forms. Runs in the browser (instant feedback)
 * and again in the API route (never trust the client).
 */

export const interests = ["trading", "ai", "other"] as const;
export type Interest = (typeof interests)[number];

export type FormKind = "contact" | "sourcing";

export type LeadPayload = {
  kind: FormKind;
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  product: string;
  quantity: string;
  destination: string;
  timeline: string;
  /** Honeypot — must stay empty. Bots tend to fill every field. */
  website?: string;
};

export type FieldName = Exclude<keyof LeadPayload, "kind" | "website">;

export type ValidationError =
  | { code: "required" }
  | { code: "email" }
  | { code: "phone" }
  | { code: "tooShort"; min: number }
  | { code: "tooLong"; max: number };

export type ValidationErrors = Partial<Record<FieldName, ValidationError>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()./-]{7,20}$/;

type Rule = { required?: boolean; min?: number; max: number; type?: "email" | "phone" };

const rules: Record<FormKind, Partial<Record<FieldName, Rule>>> = {
  contact: {
    name: { required: true, min: 2, max: 100 },
    company: { max: 150 },
    email: { required: true, type: "email", max: 200 },
    phone: { type: "phone", max: 20 },
    interest: { required: true, max: 20 },
    message: { required: true, min: 10, max: 3000 },
  },
  sourcing: {
    name: { required: true, min: 2, max: 100 },
    company: { required: true, max: 150 },
    email: { required: true, type: "email", max: 200 },
    phone: { type: "phone", max: 20 },
    product: { required: true, min: 3, max: 500 },
    quantity: { max: 200 },
    destination: { max: 200 },
    timeline: { max: 200 },
    message: { max: 3000 },
  },
};

export function isRequired(kind: FormKind, field: FieldName) {
  return !!rules[kind][field]?.required;
}

export function validateLead(data: LeadPayload): ValidationErrors {
  const errors: ValidationErrors = {};
  const kindRules = rules[data.kind];

  for (const [field, rule] of Object.entries(kindRules) as [FieldName, Rule][]) {
    const value = (data[field] ?? "").trim();
    if (!value) {
      if (rule.required) errors[field] = { code: "required" };
      continue;
    }
    if (rule.min && value.length < rule.min) errors[field] = { code: "tooShort", min: rule.min };
    else if (value.length > rule.max) errors[field] = { code: "tooLong", max: rule.max };
    else if (rule.type === "email" && !EMAIL_RE.test(value)) errors[field] = { code: "email" };
    else if (rule.type === "phone" && !PHONE_RE.test(value)) errors[field] = { code: "phone" };
  }

  if (data.kind === "contact" && data.interest && !(interests as readonly string[]).includes(data.interest)) {
    errors.interest = { code: "required" };
  }

  return errors;
}

export const emptyLead = (kind: FormKind): LeadPayload => ({
  kind,
  name: "",
  company: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
  product: "",
  quantity: "",
  destination: "",
  timeline: "",
  website: "",
});
