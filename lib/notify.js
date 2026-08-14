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

function getNotificationRecipients() {
  return String(process.env.NOTIFY_EMAIL_TO || "")
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter(Boolean);
}

/**
 * Sends a notification email to the business. Multiple recipients may be supplied in
 * NOTIFY_EMAIL_TO separated by commas or semicolons.
 */
export async function sendEmail({ subject, html, text, attachments }) {
  const transporter = getTransporter();
  if (!transporter) {
    return { sent: false, error: "SMTP not configured (see .env.example)" };
  }

  const to = getNotificationRecipients();
  const from = process.env.NOTIFY_EMAIL_FROM || process.env.SMTP_USER;
  if (!to.length) {
    return { sent: false, error: "NOTIFY_EMAIL_TO not set" };
  }

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      attachments,
    });
    return { sent: true };
  } catch (err) {
    console.error("Email send failed:", err?.message || err);
    return { sent: false, error: err?.message || "Unknown email error" };
  }
}

/**
 * Sends a confirmation email directly to a customer.
 * The customer's address is used only as the recipient; the authenticated
 * Monos mailbox remains the sender to satisfy Yahoo SMTP requirements.
 */
export async function sendCustomerEmail({ to, subject, html, text }) {
  const transporter = getTransporter();
  if (!transporter || !to || !String(to).trim()) {
    return { sent: false, error: "Customer email not available or SMTP not configured" };
  }

  const from = process.env.NOTIFY_EMAIL_FROM || process.env.SMTP_USER;
  try {
    await transporter.sendMail({
      from,
      to: String(to).trim(),
      subject,
      html,
      text,
    });
    return { sent: true };
  } catch (err) {
    console.error("Customer confirmation email failed:", err?.message || err);
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
  const graphVersion = process.env.WHATSAPP_GRAPH_VERSION || "v25.0";

  if (!token || !phoneNumberId || !to) {
    return { sent: false, error: "WhatsApp Cloud API not configured (see .env.example)" };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
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
/* ------------------------------------------------------------------ */

const hits = new Map();

export function isRateLimited(ip, { windowMs = 60_000, max = 5 } = {}) {
  const key = ip || "unknown";
  const now = Date.now();
  const record = hits.get(key);
  if (!record || now - record.start > windowMs) {
    hits.set(key, { start: now, count: 1 });
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
/* ------------------------------------------------------------------ */

export async function saveEnquiry(type, data) {
  console.log(`[enquiry:${type}]`, JSON.stringify(data));
  // TODO: replace with a real database write when the enquiry database is connected.
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
    .replace(/\"/g, "&quot;");
}
