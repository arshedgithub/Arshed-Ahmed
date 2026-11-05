import { z } from "zod";

// Error "messages" are keys into messages: contact.form.errors. The form translates them; the API route ignores them.
export const contactErrors = ["nameMin", "nameMax", "emailInvalid", "messageMin", "messageMax"] as const;
export type ContactErrorKey = (typeof contactErrors)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameMin" satisfies ContactErrorKey).max(80, "nameMax" satisfies ContactErrorKey),
  email: z.email("emailInvalid" satisfies ContactErrorKey).max(160, "emailInvalid" satisfies ContactErrorKey),
  message: z
    .string()
    .trim()
    .min(10, "messageMin" satisfies ContactErrorKey)
    .max(2000, "messageMax" satisfies ContactErrorKey),
  // Honeypot: hidden from people, filled in by bots. Formspree also recognises this field name.
  _gotcha: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
