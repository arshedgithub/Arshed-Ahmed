"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { buttonClasses } from "@/components/ui/button";
import { contactSchema, type ContactErrorKey, type ContactInput } from "@/lib/contact-schema";
import {
  Field,
  FormTitle,
  type FormCopy,
  HoneypotWrapper,
  describedBy,
  emailInputClass,
  formClass,
  inputClass,
  submitClass,
  textareaClass,
} from "./contact-form-ui";

/** Puts the email link where the message has its <email></email> tag. */
function withEmail(text: string, link: React.ReactNode) {
  const [before, after = ""] = text.split("<email></email>");
  return (
    <>
      {before}
      {link}
      {after}
    </>
  );
}

type Status = "idle" | "success" | "error" | "rateLimited";

export type ContactFormProps = {
  endpoint: string | null;
  email: string;
  copy: FormCopy;
  /** Values typed into the shell before this component loaded. */
  initialValues?: Partial<ContactInput>;
  /** id of the field that had focus in the shell, so focus carries over. */
  focusId?: string;
};

/**
 * Validation runs on blur, then live once a field has been touched (react-hook-form "onTouched"), so errors
 * never appear while someone is still typing their first attempt, and clear as soon as the value is fixed.
 */
export function ContactForm({ endpoint, email, copy, initialValues, focusId }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const resultRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "", _gotcha: "", ...initialValues },
  });

  // The schema reports keys, not sentences.
  const errorText = (message?: string) => (message ? copy.errors[message as ContactErrorKey] : undefined);

  useEffect(() => {
    if (focusId) document.getElementById(focusId)?.focus();
  }, [focusId]);

  useEffect(() => {
    if (status === "success") resultRef.current?.focus();
  }, [status]);

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    // Bots fill the honeypot; pretend it worked and drop it.
    if (data._gotcha) {
      setStatus("success");
      return;
    }
    if (!endpoint) {
      setStatus("error");
      return;
    }
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 429) {
        setStatus("rateLimited");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="card flex h-full flex-col items-start justify-center gap-3 p-6 focus:outline-none md:p-7">
        <CircleCheck size={28} className="text-live" aria-hidden="true" />
        <p className="text-lg font-semibold">{copy.successTitle}</p>
        <p className="text-fg-2">{copy.successBody}</p>
        <button type="button" onClick={() => setStatus("idle")} className={buttonClasses("secondary", "mt-2")}>
          {copy.sendAnother}
        </button>
      </div>
    );
  }

  const mailLink = () => (
    <a href={`mailto:${email}`} className="font-medium text-fg underline decoration-accent underline-offset-2">
      <bdi dir="ltr">{email}</bdi>
    </a>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={formClass} aria-labelledby="contact-form-title">
      <FormTitle title={copy.title} />

      <Field id="name" label={copy.name} error={errorText(errors.name?.message)}>
        <input id="name" type="text" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={describedBy("name", false, !!errors.name)} {...register("name")} />
      </Field>

      <Field id="email" label={copy.email} error={errorText(errors.email?.message)}>
        <input id="email" type="email" dir="ltr" inputMode="email" autoComplete="email" className={emailInputClass} aria-invalid={!!errors.email} aria-describedby={describedBy("email", false, !!errors.email)} {...register("email")} />
      </Field>

      <Field id="message" label={copy.message} hint={copy.messageHint} error={errorText(errors.message?.message)}>
        <textarea id="message" rows={5} className={textareaClass} aria-invalid={!!errors.message} aria-describedby={describedBy("message", true, !!errors.message)} {...register("message")} />
      </Field>

      <HoneypotWrapper>
        <input id="_gotcha" type="text" tabIndex={-1} autoComplete="off" {...register("_gotcha")} />
      </HoneypotWrapper>

      {(status === "error" || status === "rateLimited") && (
        <p role="alert" className="flex items-start gap-2 rounded-control border border-danger/40 p-3 text-sm text-fg">
          <CircleAlert size={18} className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
          <span>{withEmail(status === "rateLimited" ? copy.rateLimited : copy.failed, mailLink())}</span>
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className={submitClass}>
        {isSubmitting ? (
          <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
        ) : (
          <Send size={16} className="rtl:-scale-x-100" aria-hidden="true" />
        )}
        {isSubmitting ? copy.sending : copy.send}
      </button>
    </form>
  );
}
