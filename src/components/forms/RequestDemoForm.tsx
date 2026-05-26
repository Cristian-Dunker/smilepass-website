"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { sendRequestDemo, type RequestDemoResult } from "@/app/actions/send-request-demo";
import { requestDemoSchema } from "@/lib/schemas/request-demo";

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "practiceWebsite" | "notes", string>>;

const initialFields = {
  name: "",
  email: "",
  phone: "",
  practiceWebsite: "",
  notes: "",
};

export interface RequestDemoFormProps {
  /**
   * Label for the submit button. Defaults to "Send message". Override only
   * if the surface needs different wording.
   */
  submitLabel?: string;
  /**
   * If provided, renders a cancel button to the left of submit. Used by the
   * modal wrapper; the embedded contact page does not pass this.
   */
  onCancel?: () => void;
  /**
   * Fires after a successful Notion write, before the success state renders.
   * Useful for analytics ("demo_request_submitted") or for the modal wrapper
   * to switch into its confirmation panel.
   */
  onSuccess?: () => void;
  /**
   * Override the success message UI. When omitted, the form swaps to its
   * default success panel inside the same container.
   */
  renderSuccess?: (reset: () => void) => React.ReactNode;
}

/**
 * Request-a-Demo form body — schema-validated, Server-Action-driven, surface-agnostic.
 *
 * Two surfaces consume it today:
 *   - RequestDemoModal — modal wrapper with cancel button + custom success panel
 *   - /contact page    — embedded inline, no cancel button
 *
 * Per work rule #2 (zero inline duplication), the field layout, validation,
 * submit flow, and Notion wiring live here. New surfaces (e.g. a sidebar
 * drawer) compose this component rather than copying the form.
 */
export default function RequestDemoForm({
  submitLabel = "Send message",
  onCancel,
  onSuccess,
  renderSuccess,
}: RequestDemoFormProps) {
  const pathname = usePathname();
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [topLevelError, setTopLevelError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  function reset() {
    setFields(initialFields);
    setFieldErrors({});
    setTopLevelError(null);
    setSubmitted(false);
  }

  function handleChange(name: keyof typeof initialFields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [name]: e.target.value }));
      if (fieldErrors[name]) {
        setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
      }
      if (topLevelError) setTopLevelError(null);
    };
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;

    // Client-side validation (same schema as the action).
    const payload = {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      practiceWebsite: fields.practiceWebsite,
      notes: fields.notes.trim() === "" ? undefined : fields.notes,
      sourcePage: pathname,
    };
    const parsed = requestDemoSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (
          typeof key === "string" &&
          (key === "name" ||
            key === "email" ||
            key === "practiceWebsite" ||
            key === "notes") &&
          !next[key]
        ) {
          next[key] = issue.message;
        }
      }
      setFieldErrors(next);
      setTopLevelError("Please check the highlighted fields and try again.");
      return;
    }

    startTransition(async () => {
      const result: RequestDemoResult = await sendRequestDemo(parsed.data);
      if (result.success) {
        setSubmitted(true);
        onSuccess?.();
      } else {
        setFieldErrors(result.fieldErrors ?? {});
        setTopLevelError(result.error);
      }
    });
  }

  if (submitted) {
    if (renderSuccess) return <>{renderSuccess(reset)}</>;
    return (
      <div className="flex flex-col gap-4">
        <p className="text-[0.95rem] text-purple-deep/80 leading-relaxed">
          Thanks — your message is in. Someone from the SmilePass team will be
          in touch shortly. In the meantime you can also{" "}
          <a
            href="https://app.smilepass.com.au/pages/authentication/first-access"
            className="text-brand-purple font-semibold hover:text-brand-purple-hover"
          >
            get started free
          </a>{" "}
          today.
        </p>
        <button type="button" onClick={reset} className="btn-outline-purple self-start text-[0.9rem]">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Field
        label="Your name"
        name="name"
        type="text"
        autoComplete="name"
        value={fields.name}
        error={fieldErrors.name}
        onChange={handleChange("name")}
        disabled={pending}
        required
      />
      <Field
        label="Practice website"
        name="practiceWebsite"
        type="text"
        inputMode="url"
        autoComplete="url"
        placeholder="yourpractice.com.au"
        value={fields.practiceWebsite}
        error={fieldErrors.practiceWebsite}
        onChange={handleChange("practiceWebsite")}
        disabled={pending}
        required
      />
      <Field
        label="Email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={fields.email}
        error={fieldErrors.email}
        onChange={handleChange("email")}
        disabled={pending}
        required
      />
      <Field
        label="Phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={fields.phone}
        error={fieldErrors.phone}
        onChange={handleChange("phone")}
        disabled={pending}
        required
      />
      <Field
        label="Notes"
        name="notes"
        as="textarea"
        rows={4}
        placeholder="Tell us a bit about your practice or what you'd like to see (optional)."
        value={fields.notes}
        error={fieldErrors.notes}
        onChange={handleChange("notes")}
        disabled={pending}
      />

      {topLevelError && (
        <p
          role="alert"
          className="text-[0.85rem] text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2"
        >
          {topLevelError}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-[0.9rem] font-medium text-purple-deep/70 hover:text-purple-deep px-3 py-2"
            disabled={pending}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn-primary text-[0.9rem]"
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Sending..." : submitLabel}
        </button>
      </div>

      <p className="text-[0.78rem] text-purple-deep/55 leading-snug">
        By submitting, you agree to be contacted by SmilePass about your
        request. We do not share your details with third parties.
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────── */

type BaseFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

type InputFieldProps = BaseFieldProps & {
  as?: "input";
  type: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url";
};

type TextareaFieldProps = BaseFieldProps & {
  as: "textarea";
  rows?: number;
};

type FieldProps = InputFieldProps | TextareaFieldProps;

function Field(props: FieldProps) {
  const inputId = `field-${props.name}`;
  const errorId = props.error ? `${inputId}-error` : undefined;
  const baseClass = `w-full rounded-lg border bg-paper px-3.5 py-2.5 text-[0.95rem] text-purple-deep placeholder:text-purple-deep/40 focus:outline-none focus:ring-2 focus:ring-brand-purple/40 focus:border-brand-purple transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
    props.error ? "border-red-400" : "border-divider"
  }`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[0.85rem] font-medium text-purple-deep">
        {props.label}
        {props.required && <span aria-hidden className="text-brand-purple ml-0.5">*</span>}
      </label>
      {props.as === "textarea" ? (
        <textarea
          id={inputId}
          name={props.name}
          rows={props.rows ?? 4}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          disabled={props.disabled}
          aria-invalid={Boolean(props.error)}
          aria-describedby={errorId}
          className={`${baseClass} resize-y`}
        />
      ) : (
        <input
          id={inputId}
          name={props.name}
          type={props.type}
          inputMode={props.inputMode}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          disabled={props.disabled}
          aria-invalid={Boolean(props.error)}
          aria-describedby={errorId}
          className={baseClass}
        />
      )}
      {props.error && (
        <p id={errorId} role="alert" className="text-[0.8rem] text-red-600">
          {props.error}
        </p>
      )}
    </div>
  );
}
