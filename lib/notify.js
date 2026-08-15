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
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return cachedTransporter;
}

function getNotificationRecipients() {
  return String(process.env.NOTIFY_EMAIL_TO || "")
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function sendEmail({ subject, html, text, attachments }) {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, error: "SMTP not configured" };

  const to = getNotificationRecipients();
  const from = process.env.NOTIFY_EMAIL_FROM || process.env.SMTP_USER;
  if (!to.length) return { sent: false, error: "NOTIFY_EMAIL_TO not set" };

  try {
    await transporter.sendMail({ from, to, subject, html, text, attachments });
    return { sent: true };
  } catch (err) {
    console.error("Email send failed:", err?.message || err);
    return { sent: false, error: err?.message || "Unknown email error" };
  }
}

export async function sendCustomerEmail({ to, subject, html, text }) {
  const transporter = getTransporter();
  if (!transporter || !to || !String(to).trim()) {
    return { sent: false, error: "Customer email not available or SMTP not configured" };
  }

  const from = process.env.NOTIFY_EMAIL_FROM || process.env.SMTP_USER;
  try {
    await transporter.sendMail({ from, to: String(to).trim(), subject, html, text });
    return { sent: true };
  } catch (err) {
    console.error("Customer confirmation email failed:", err?.message || err);
    return { sent: false, error: err?.message || "Unknown customer email error" };
  }
}

/* ------------------------------------------------------------------ */
/*  WHATSAPP (Meta WhatsApp Cloud API)                                  */
/* ------------------------------------------------------------------ */

function getWhatsAppRecipients() {
  // Keep phone numbers in Vercel environment variables rather than source code.
  // WHATSAPP_TO_NUMBER may contain one or more comma/semicolon-separated numbers.
  return String(process.env.WHATSAPP_TO_NUMBER || process.env.WHATSAPP_TO_NUMBERS || "")
    .split(/[;,]/)
    .map((value) => value.trim().replace(/[^0-9]/g, ""))
    .filter(Boolean)
    .filter((value, index, list) => list.indexOf(value) === index);
}

async function postWhatsAppMessage({ token, phoneNumberId, graphVersion, to, message }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
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
        signal: controller.signal,
      }
    );

    const body = await res.text();
    if (!res.ok) {
      let detail = body;
      try {
        const parsed = JSON.parse(body);
        detail = parsed?.error?.message || parsed?.error?.error_user_msg || body;
      } catch {}
      return { sent: false, to, status: res.status, error: String(detail).slice(0, 500) };
    }

    let messageId;
    try {
      const parsed = JSON.parse(body);
      messageId = parsed?.messages?.[0]?.id;
    } catch {}
    return { sent: true, to, status: res.status, ...(messageId ? { messageId } : {}) };
  } catch (err) {
    return {
      sent: false,
      to,
      error: err?.name === "AbortError" ? "WhatsApp API timeout" : err?.message || "Network error",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function sendWhatsApp(message) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipients = getWhatsAppRecipients();
  const graphVersion = process.env.WHATSAPP_GRAPH_VERSION || "v25.0";

  if (!token || !phoneNumberId || !recipients.length) {
    return {
      sent: false,
      error: "WhatsApp Cloud API is not fully configured. Set WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_TO_NUMBER in Vercel.",
    };
  }

  const results = [];
  for (const to of recipients) {
    let result = null;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      result = await postWhatsAppMessage({ token, phoneNumberId, graphVersion, to, message });
      if (result.sent) break;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
    }
    results.push(result);
  }

  const sentCount = results.filter((result) => result?.sent).length;
  if (sentCount) {
    return { sent: true, recipients: results.map(({ to, sent, status, messageId }) => ({ to, sent, status, ...(messageId ? { messageId } : {}) })) };
  }

  console.error("All WhatsApp notifications failed:", JSON.stringify(results));
  return {
    sent: false,
    recipients: results,
    error: "WhatsApp notification failed for all configured recipients",
  };
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
  return record.count > max;
}

export function honeypotTripped(body) {
  return Boolean(body?.company_website);
}

/* ------------------------------------------------------------------ */
/*  ENQUIRY STORE                                                       */
/* ------------------------------------------------------------------ */

export async function saveEnquiry(type, data) {
  console.log(`[enquiry:${type}]`, JSON.stringify(data));
  return true;
}

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
