import { NextResponse } from "next/server";
import {
  sendEmail,
  sendCustomerEmail,
  sendWhatsApp,
  isRateLimited,
  honeypotTripped,
  saveEnquiry,
  missingFields,
  escapeHtml,
} from "@/lib/notify";

export const runtime = "nodejs";

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

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  if (honeypotTripped(body)) {
    return NextResponse.json({ ok: true });
  }

  const required = ["name", "phone", "vehicleMake", "vehicleModel", "service"];
  const missing = missingFields(body, required);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, message: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const {
    name,
    phone,
    email,
    vehicleMake,
    vehicleModel,
    year,
    service,
    date,
    time,
    notes,
  } = body;

  const subject = `New Booking — ${name} (${vehicleMake} ${vehicleModel})`;

  const rows = [
    ["Customer Name", name],
    ["Phone", phone],
    ["Email", email || "—"],
    ["Vehicle", `${vehicleMake} ${vehicleModel}${year ? " (" + year + ")" : ""}`],
    ["Service Needed", service],
    ["Preferred Date", date || "Not specified"],
    ["Preferred Time", time || "Not specified"],
    ["Additional Notes", notes || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#d5001c;margin-bottom:4px;">New Service Booking</h2>
      <p style="color:#666;margin-top:0;">Monos VW-Audi Service &amp; Parts — website booking</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:8px 0;color:#888;width:160px;vertical-align:top;">${label}</td><td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(
                String(value)
              )}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin-top:20px;font-size:12px;color:#999;">Confirm this booking with the customer as soon as possible.</p>
    </div>
  `;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#222;line-height:1.6;">
      <h2 style="margin-bottom:6px;">Thank you for contacting Monos VW-Audi Service &amp; Parts</h2>
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for submitting your service booking request. We have received your request successfully.</p>
      <p>Our service team will review the details and contact you shortly to confirm the appointment, availability and any further information we may need.</p>
      <p><strong>Vehicle:</strong> ${escapeHtml(`${vehicleMake} ${vehicleModel}${year ? ` (${year})` : ""}`)}<br />
      <strong>Service requested:</strong> ${escapeHtml(service)}<br />
      <strong>Preferred date:</strong> ${escapeHtml(date || "Not specified")}<br />
      <strong>Preferred time:</strong> ${escapeHtml(time || "Not specified")}</p>
      <p>Please note that this email confirms receipt of your request and does not yet confirm an appointment. We will contact you with confirmation.</p>
      <p>Kind regards,<br /><strong>Monos VW-Audi Service &amp; Parts</strong></p>
    </div>
  `;

  const customerText = `Dear ${name},\n\nThank you for submitting your service booking request to Monos VW-Audi Service & Parts. We have received your request successfully.\n\nOur service team will review the details and contact you shortly to confirm the appointment, availability and any further information we may need.\n\nVehicle: ${vehicleMake} ${vehicleModel}${year ? ` (${year})` : ""}\nService requested: ${service}\nPreferred date: ${date || "Not specified"}\nPreferred time: ${time || "Not specified"}\n\nPlease note that this email confirms receipt of your request and does not yet confirm an appointment. We will contact you with confirmation.\n\nKind regards,\nMonos VW-Audi Service & Parts`;

  const waMessage =
    `*New Service Booking*\n` +
    rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const [emailResult, customerEmailResult, waResult] = await Promise.all([
    sendEmail({ subject, html, text }),
    sendCustomerEmail({
      to: email || undefined,
      subject: "We received your Monos service booking request",
      html: customerHtml,
      text: customerText,
    }),
    sendWhatsApp(waMessage),
  ]);

  await saveEnquiry("booking", { ...body, receivedAt: new Date().toISOString() });

  return NextResponse.json({
    ok: true,
    message: "Booking received. Our service desk will contact you to confirm the appointment.",
    channels: { email: emailResult, customerEmail: customerEmailResult, whatsapp: waResult },
  });
}
