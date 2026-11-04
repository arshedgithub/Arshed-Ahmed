"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { buttonClasses } from "@/components/ui/button";
import { contactSchema, type ContactErrorKey, type ContactInput } from "@/lib/contact-schema";
import {
  Field,
  FormTitle,
  HoneypotWrapper,
  formClass,
  inputClass,
  submitClass,
  textareaClass,
} from "./contact-form-ui";

type Status = "idle" | "success" | "error";

export type ContactFormProps = {
  endpoint: string | null;
  email: string;
  /** Values typed into the shell before this component loaded. */
  initialValues?: Partial<ContactInput>;
  /** id of the field that had focus in the shell, so focus carries over. */
  focusId?: string;
};

export function ContactForm({ endpoint, email, initialValues, focusId }: ContactFormProps) {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
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
  const errorText = (message?: string) => (message ? t(`errors.${message as ContactErrorKey}`) : undefined);

  useEffect(() => {
    if (focusId) document.getElementById(focusId)?.focus();
  }, [focusId]);

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
      if (!res.ok) throw new Error(String(res.status));
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="card flex h-full flex-col items-start justify-center gap-3 p-6">
        <CircleCheck size={28} className="text-success" aria-hidden="true" />
        <p className="text-lg font-semibold">{t("successTitle")}</p>
        <p className="text-muted">{t("successBody")}</p>
        <button type="button" onClick={() => setStatus("idle")} className={buttonClasses("secondary", "mt-2")}>
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={formClass} aria-labelledby="contact-form-title">
      <FormTitle />

      <Field id="name" label={t("name")} error={errorText(errors.name?.message)}>
        <input id="name" type="text" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
      </Field>

      <Field id="email" label={t("email")} error={errorText(errors.email?.message)}>
        <input id="email" type="email" inputMode="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
      </Field>

      <Field id="message" label={t("message")} error={errorText(errors.message?.message)}>
        <textarea id="message" rows={5} className={textareaClass} placeholder={t("messagePlaceholder")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
      </Field>

      <HoneypotWrapper>
        <input id="_gotcha" type="text" tabIndex={-1} autoComplete="off" {...register("_gotcha")} />
      </HoneypotWrapper>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 p-3 text-sm text-fg">
          <CircleAlert size={18} className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
          <span>
            {t.rich("failed", {
              email: () => (
                <a href={`mailto:${email}`} className="font-medium text-accent underline underline-offset-2">
                  {email}
                </a>
              ),
            })}
          </span>
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className={submitClass}>
        {isSubmitting ? (
          <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
        ) : (
          <Send size={16} aria-hidden="true" />
        )}
        {isSubmitting ? t("sending") : t("send")}
      </button>
    </form>
  );
}
