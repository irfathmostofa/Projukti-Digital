import type { ContactSubmission } from "@/types";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export function isEmailJsConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

type ContactPayload = Pick<
  ContactSubmission,
  "name" | "email" | "phone" | "company" | "service" | "budget" | "message"
>;

export async function sendContactEmail(payload: ContactPayload) {
  if (!isEmailJsConfigured()) {
    return { ok: false, error: "EmailJS is not configured." };
  }

  try {
    const { default: emailjs } = await import("@emailjs/browser");
    await emailjs.send(
      SERVICE_ID as string,
      TEMPLATE_ID as string,
      {
        from_name: payload.name,
        from_email: payload.email,
        phone: payload.phone || "",
        company: payload.company || "",
        service: payload.service || "",
        budget: payload.budget || "",
        message: payload.message || "",
        reply_to: payload.email,
      },
      PUBLIC_KEY
    );
    return { ok: true };
  } catch (err) {
    console.error("EmailJS send failed:", err);
    return { ok: false, error: "Failed to send email." };
  }
}
