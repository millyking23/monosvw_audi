import { NextResponse } from "next/server";
import {
  sendEmail,
  sendWhatsApp,
  isRateLimited,
  honeypotTripped,
  saveEnquiry,
  escapeHtml,
} from "@/lib/notify";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_TOTAL_BYTES = 8 * 1024 * 1024; // 8MB combined photo budget

function getIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

export async function POST(req) {
  const ip = getIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let form;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid form submission." }, { status: 400 });
  }

  const get = (key) => (form.get(key) ? String(form.get(key)) : "");

  if (honeypotTripped({ company_website: get("company_website") })) {
    return NextResponse.json({ ok: true }); // silently accept for bots
  }

  const name = get("name");
  const phone = get("phone");
  const email = get("email");
  const vehicle = get("vehicle");
  const issue = get("issue");

  const missing = ["name", "phone", "vehicle", "issue"].filter(
    (k) => !{ name, phone, vehicle, issue }[k]?.trim()
  );
  if (missing.length) {
    return NextResponse.json(
      { ok: false, message: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // Collect uploaded photos (input name="photos", multiple files)
  const files = form.getAll("photos").filter((f) => f && typeof f.arrayBuffer === "function" && f.size > 0);
  let totalBytes = 0;
  const attachments = [];
  for (const file of files) {
    totalBytes += file.size;
    if (totalBytes > MAX_TOTAL_BYTES) break;
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name || "photo.jpg",
      content: buffer,
      contentType: file.type || "image/jpeg",
    });
  }

  const subject = `New Quote Request — ${name} (${vehicle})`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#d5001c;margin-bottom:4px;">New Quote Request</h2>
      <p style="color:#666;margin-top:0;">Monos VW-Audi Service &amp; Parts — website enquiry</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#888;width:160px;">Customer Name</td><td style="padding:8px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#888;">Phone / WhatsApp</td><td style="padding:8px 0;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;">${escapeHtml(email || "—")}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Vehicle / Machine</td><td style="padding:8px 0;">${escapeHtml(vehicle)}</td></tr>
        <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Issue Description</td><td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(issue)}</td></tr>
        <tr><td style="padding:8px 0;color:#888;">Photos</td><td style="padding:8px 0;">${attachments.length ? `${attachments.length} photo(s) attached` : "No photos attached"}</td></tr>
      </table>
      <p style="margin-top:20px;font-size:12px;color:#999;">Reply to the customer using the supplied phone number or email.</p>
    </div>
  `;

  const text = `NEW QUOTE REQUEST\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "—"}\nVehicle: ${vehicle}\nIssue: ${issue}\nPhotos: ${attachments.length} attached`;

  const waMessage =
    `*New Quote Request*\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Vehicle: ${vehicle}\n` +
    `Issue: ${issue}` +
    (attachments.length ? `\nPhotos: ${attachments.length} attached (see email)` : "");

  const [emailResult, waResult] = await Promise.all([
    sendEmail({ subject, html, text, attachments, replyTo: email || undefined }),
    sendWhatsApp(waMessage),
  ]);

  await saveEnquiry("quote", {
    name,
    phone,
    email,
    vehicle,
    issue,
    photoCount: attachments.length,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: "Quote request received. Our estimating team will contact you shortly.",
    channels: { email: emailResult, whatsapp: waResult },
  });
}
