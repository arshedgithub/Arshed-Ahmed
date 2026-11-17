import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode, Ref } from "react";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Shared by the lightweight shell and the full react-hook-form version, so both render identically.

export const formClass = "card relative grid gap-5 p-5 md:p-7";

export const inputClass =
  "w-full rounded-control border border-line-strong bg-canvas px-3 py-2.5 text-base text-fg transition-colors focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent aria-[invalid=true]:border-danger";

// Addresses are always left-to-right, even on the Arabic form; text-align start keeps them on the reading edge.
export const emailInputClass = cn(inputClass, "text-start");

export const textareaClass = cn(inputClass, "resize-y");

export function FormTitle() {
  const t = useTranslations("contact.form");
  return (
    <h3 id="contact-form-title" className="text-lg font-semibold">
      {t("title")}
    </h3>
  );
}

/** Visible label always; an optional hint below it is tied to the input with aria-describedby. */
export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, hint: boolean, error: boolean) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

/** Spam honeypot: off-screen, hidden from screen readers, out of the tab order, no visible text. */
export function HoneypotWrapper({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -start-[9999px] h-px w-px overflow-hidden opacity-0">
      {children}
    </div>
  );
}

export const submitClass = buttonClasses("primary", "w-full disabled:opacity-70 sm:w-auto sm:justify-self-start");

/**
 * Static stand-in rendered until the interactive form loads. Same markup and size,
 * so swapping it out causes no layout shift.
 */
export function ContactFormShell({ formRef, onActivate }: { formRef: Ref<HTMLFormElement>; onActivate: () => void }) {
  const t = useTranslations("contact.form");
  return (
    <form
      ref={formRef}
      noValidate
      className={formClass}
      aria-labelledby="contact-form-title"
      onFocusCapture={onActivate}
      onPointerDownCapture={onActivate}
      onSubmit={(e) => e.preventDefault()}
    >
      <FormTitle />
      <Field id="name" label={t("name")}>
        <input id="name" name="name" type="text" autoComplete="name" className={inputClass} />
      </Field>
      <Field id="email" label={t("email")}>
        <input id="email" name="email" type="email" dir="ltr" inputMode="email" autoComplete="email" className={emailInputClass} />
      </Field>
      <Field id="message" label={t("message")} hint={t("messageHint")}>
        <textarea id="message" name="message" rows={5} className={textareaClass} aria-describedby="message-hint" />
      </Field>
      <HoneypotWrapper>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </HoneypotWrapper>
      <button type="submit" className={submitClass}>
        <Send size={16} className="rtl:-scale-x-100" aria-hidden="true" />
        {t("send")}
      </button>
    </form>
  );
}
