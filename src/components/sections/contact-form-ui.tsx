import { Send } from "lucide-react";
import type { ReactNode, Ref } from "react";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Shared by the lightweight shell and the full react-hook-form version, so both render identically.

export const formClass = "card relative grid gap-4 p-5 md:p-6";

export const inputClass =
  "w-full rounded-lg border border-line-strong bg-canvas px-3 py-2.5 text-base text-fg placeholder:text-muted/70 transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 aria-[invalid=true]:border-danger md:text-sm";

export const textareaClass = cn(inputClass, "resize-y");

export const messagePlaceholder = "A role, a project or a question";

export function FormTitle() {
  return (
    <h3 id="contact-form-title" className="font-semibold">
      Send a message
    </h3>
  );
}

export function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Spam honeypot: off-screen, hidden from screen readers, out of the tab order, no visible text. */
export function HoneypotWrapper({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0">
      {children}
    </div>
  );
}

export const submitClass = buttonClasses("primary", "w-full disabled:opacity-70");

/**
 * Static stand-in rendered until the interactive form loads. Same markup and size,
 * so swapping it out causes no layout shift.
 */
export function ContactFormShell({ formRef, onActivate }: { formRef: Ref<HTMLFormElement>; onActivate: () => void }) {
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
      <Field id="name" label="Name">
        <input id="name" name="name" type="text" autoComplete="name" className={inputClass} />
      </Field>
      <Field id="email" label="Email">
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" className={inputClass} />
      </Field>
      <Field id="message" label="Message">
        <textarea id="message" name="message" rows={5} className={textareaClass} placeholder={messagePlaceholder} />
      </Field>
      <HoneypotWrapper>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </HoneypotWrapper>
      <button type="submit" className={submitClass}>
        <Send size={16} aria-hidden="true" />
        Send message
      </button>
    </form>
  );
}
