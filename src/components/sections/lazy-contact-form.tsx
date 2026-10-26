"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import type { ContactInput } from "@/lib/contact-schema";
import type { ContactFormProps } from "./contact-form";
import { ContactFormShell } from "./contact-form-ui";

/**
 * Renders a static copy of the form and loads the real one (react-hook-form + zod) only when the
 * contact section nears the viewport or the visitor interacts with it. Keeps ~90 KB of JS out of
 * the initial page load.
 */
export function LazyContactForm({ endpoint, email }: { endpoint: string | null; email: string }) {
  const shellRef = useRef<HTMLFormElement>(null);
  const loading = useRef(false);
  const [loaded, setLoaded] = useState<{
    Form: ComponentType<ContactFormProps>;
    initialValues: Partial<ContactInput>;
    focusId?: string;
  } | null>(null);

  const activate = useCallback(() => {
    if (loading.current) return;
    loading.current = true;
    import("./contact-form").then(({ ContactForm }) => {
      // Carry over anything typed (and the focused field) before the real form arrived.
      const shell = shellRef.current;
      const data = shell ? Object.fromEntries(new FormData(shell)) : {};
      const active = document.activeElement;
      setLoaded({
        Form: ContactForm,
        initialValues: data as Partial<ContactInput>,
        focusId: active && shell?.contains(active) ? active.id : undefined,
      });
    });
  }, []);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          activate();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [activate]);

  if (loaded) {
    const { Form, initialValues, focusId } = loaded;
    return <Form endpoint={endpoint} email={email} initialValues={initialValues} focusId={focusId} />;
  }
  return <ContactFormShell formRef={shellRef} onActivate={activate} />;
}
