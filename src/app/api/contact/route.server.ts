import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

/**
 * Contact form handler for server deployments (Vercel). Not included in static exports
 * (see pageExtensions in next.config.ts); those use NEXT_PUBLIC_CONTACT_ENDPOINT instead.
 *
 * Env (server-only, never exposed to the client):
 *   RESEND_API_KEY      Resend API key
 *   CONTACT_TO_EMAIL    inbox that receives messages (defaults to the site email)
 *   CONTACT_FROM_EMAIL  verified Resend sender, e.g. "Portfolio <contact@arshedahmed.com>"
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Invalid input" }, { status: 422 });
  }

  const { name, email, message, _gotcha } = parsed.data;
  // Honeypot filled: report success so bots learn nothing.
  if (_gotcha) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_FROM_EMAIL is not set");
    return Response.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend responded", res.status, await res.text());
    return Response.json({ ok: false, error: "Send failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
