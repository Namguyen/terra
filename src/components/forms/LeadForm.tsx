"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Copy } from "@content/copy";
import {
  emptyLead,
  interests,
  isRequired,
  validateLead,
  type FieldName,
  type FormKind,
  type LeadPayload,
  type ValidationError,
  type ValidationErrors,
} from "@/lib/validation";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

type LeadFormProps = {
  kind: FormKind;
  t: Copy["form"];
  initial?: Partial<LeadPayload>;
};

type FieldConfig = {
  name: FieldName;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  autoComplete?: string;
  wide?: boolean;
};

const layouts: Record<FormKind, FieldConfig[]> = {
  contact: [
    { name: "name", autoComplete: "name" },
    { name: "company", autoComplete: "organization" },
    { name: "email", type: "email", autoComplete: "email" },
    { name: "phone", type: "tel", autoComplete: "tel" },
    { name: "interest", type: "select", wide: true },
    { name: "message", type: "textarea", wide: true },
  ],
  sourcing: [
    { name: "name", autoComplete: "name" },
    { name: "company", autoComplete: "organization" },
    { name: "email", type: "email", autoComplete: "email" },
    { name: "phone", type: "tel", autoComplete: "tel" },
    { name: "product", type: "textarea", wide: true },
    { name: "quantity" },
    { name: "destination" },
    { name: "timeline", wide: true },
    { name: "message", type: "textarea", wide: true },
  ],
};

function errorMessage(t: Copy["form"], error: ValidationError) {
  switch (error.code) {
    case "tooShort":
      return t.errors.tooShort.replace("{min}", String(error.min));
    case "tooLong":
      return t.errors.tooLong.replace("{max}", String(error.max));
    default:
      return t.errors[error.code];
  }
}

const inputBase =
  "block w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-moss-700/60 transition-colors focus:border-moss-700 focus:outline-none focus:ring-2 focus:ring-moss-700/20";

/** Lead form used for general contact / quote / AI booking ("contact") and sourcing requests ("sourcing"). */
export function LeadForm({ kind, t, initial }: LeadFormProps) {
  const [values, setValues] = useState<LeadPayload>({ ...emptyLead(kind), ...initial });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const idPrefix = `${kind}-form`;

  const update = (name: FieldName, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validateLead(next));
  };

  const onBlur = (name: FieldName) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateLead(values));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateLead(values);
    setErrors(found);
    setTouched(Object.fromEntries(layouts[kind].map((f) => [f.name, true])));

    const firstInvalid = layouts[kind].find((f) => found[f.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${idPrefix}-${firstInvalid.name}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      setValues({ ...emptyLead(kind) });
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const label = (name: FieldName) => t.fields[name];
  const placeholder = (name: FieldName) =>
    name in t.placeholders ? t.placeholders[name as keyof typeof t.placeholders] : undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Honeypot: hidden from people and assistive tech, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input
          id={`${idPrefix}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={(e) => setValues({ ...values, website: e.target.value })}
        />
      </div>

      {layouts[kind].map((field) => {
        const id = `${idPrefix}-${field.name}`;
        const required = isRequired(kind, field.name);
        const error = touched[field.name] ? errors[field.name] : undefined;
        const describedBy = error ? `${id}-error` : undefined;
        const common = {
          id,
          name: field.name,
          value: values[field.name],
          required,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
          onBlur: () => onBlur(field.name),
          className: `${inputBase} ${error ? "border-red-700" : "border-moss-900/15"}`,
        };

        return (
          <div key={field.name} className={field.wide ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="mb-1.5 flex items-baseline gap-1.5 text-sm font-medium text-moss-950">
              {label(field.name)}
              {required ? (
                <span className="text-accent-700" aria-hidden="true">
                  *
                </span>
              ) : (
                <span className="text-xs font-normal text-muted">({t.optional})</span>
              )}
              {required ? <span className="sr-only">({t.required})</span> : null}
            </label>

            {field.type === "textarea" ? (
              <textarea
                {...common}
                rows={field.name === "message" ? 5 : 3}
                placeholder={placeholder(field.name)}
                onChange={(e) => update(field.name, e.target.value)}
              />
            ) : field.type === "select" ? (
              <select {...common} onChange={(e) => update(field.name, e.target.value)}>
                <option value="">{t.interestOptions.select}</option>
                {interests.map((opt) => (
                  <option key={opt} value={opt}>
                    {t.interestOptions[opt]}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...common}
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                placeholder={placeholder(field.name)}
                onChange={(e) => update(field.name, e.target.value)}
              />
            )}

            {error ? (
              <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-700">
                {errorMessage(t, error)}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="sm:col-span-2">
        <p className="text-xs leading-relaxed text-muted">{t.privacy}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? t.submitting : kind === "sourcing" ? t.submitSourcing : t.submit}
          {status !== "submitting" ? <Icon name="arrowRight" className="size-4" /> : null}
        </button>

        <div aria-live="polite" role="status" className="mt-4 empty:hidden">
          {status === "success" ? (
            <p className="flex items-start gap-2 rounded-xl bg-moss-50 p-4 text-sm text-moss-900">
              <Icon name="check" className="size-5 shrink-0 text-moss-700" />
              {t.success}
            </p>
          ) : null}
          {status === "error" ? <p className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{t.error}</p> : null}
        </div>
      </div>
    </form>
  );
}
