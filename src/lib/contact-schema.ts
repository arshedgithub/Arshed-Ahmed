import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name (at least 2 characters).").max(80, "Keep your name under 80 characters."),
  email: z.email("Enter a valid email address, like name@company.com.").max(160),
  message: z
    .string()
    .trim()
    .min(10, "Add a few more details (at least 10 characters).")
    .max(2000, "Keep your message under 2000 characters."),
  // Honeypot: hidden from people, filled in by bots. Formspree also recognises this field name.
  _gotcha: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
