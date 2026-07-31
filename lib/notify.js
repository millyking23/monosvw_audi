import nodemailer from "nodemailer";

/* ------------------------------------------------------------------ */
/*  EMAIL                                                              */
/* ------------------------------------------------------------------ */

let cachedTransporter = null;

function getTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return cachedTransporter;
}

/**
 * Sends a notification email. Returns { sent: boolean, error?: string }
 * so calling code can still tell the customer "received" even if email
 * delivery is not yet configured (fails soft, never blocks the customer).
 */
export async function sendEmail({ subject, html, text, attachments }) {
  const transporter = getTransporter();
  if (!transporter) {
    return { sent: false, error: "SMTP not configured (see .env.example)" };
  }
  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM || process.env.SMTP_USER;
  if (!to) {
    return { sent: false, error: "NOTIFY_EMAIL_TO not set" };
  }

  try {
    await transporter.sendMail({ from, to, subject, html, text, attachments });
    return { sent: true };
  } catch (err) {
    console.error("Email send failed:", err?.message || err);
    return { sent: false, error: err?.message || "Unknown email error" };
  }
}

/* ------------------------------------------------------------------ */
/*  WHATSAPP (Meta WhatsApp Cloud API)                                  */
/* ------------------------------------------------------------------ */

export async function sendWhatsApp(message) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_TO_NUMBER;

  if (!token || !phoneNumberId || !to) {
    return { sent: false, error: "WhatsApp Cloud API not configured (see .env.example)" };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: message },
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.text();
      console.error("WhatsApp send failed:", res.status, errBody);
      return { sent: false, error: `WhatsApp API error ${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("WhatsApp send failed:", err?.message || err);
    return { sent: false, error: err?.message || "Unknown WhatsApp error" };
  }
}

/* ------------------------------------------------------------------ */
/*  SPAM PROTECTION — honeypot + best-effort in-memory rate limiting   */
/*  (Serverless functions are short-lived, so this is a lightweight    */
/*  first line of defence. For stronger protection, add Cloudflare     */
/*  Turnstile or Vercel's built-in Attack Challenge Mode.)             */
/* ------------------------------------------------------------------ */

const hits = new Map();

export function isRateLimited(ip, { windowMs = 60_000, max = 5 } = {}) {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || now - record.start > windowMs) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  record.count += 1;
  if (record.count > max) return true;
  return false;
}

export function honeypotTripped(body) {
  // Hidden field named "company_website" — real customers never fill it,
  // bots that auto-fill every field will.
  return Boolean(body?.company_website);
}

/* ------------------------------------------------------------------ */
/*  ENQUIRY STORE STUB                                                  */
/*  Wire this up to Vercel Postgres / Supabase / Airtable later to      */
/*  power an admin dashboard. For now it just logs server-side so      */
/*  nothing is silently lost while a database is not yet connected.    */
/* ------------------------------------------------------------------ */

export async function saveEnquiry(type, data) {
  console.log(`[enquiry:${type}]`, JSON.stringify(data));
  // TODO: replace with a real database write, e.g.:
  // await sql`INSERT INTO enquiries (type, payload, created_at) VALUES (${type}, ${JSON.stringify(data)}, now())`;
  return true;
}

/* ------------------------------------------------------------------ */
/*  Simple field validation helper shared by all three routes          */
/* ------------------------------------------------------------------ */

export function missingFields(body, required) {
  return required.filter((key) => !body?.[key] || String(body[key]).trim() === "");
}

export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
