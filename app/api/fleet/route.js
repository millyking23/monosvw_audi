import { NextResponse } from "next/server";
import {
  sendEmail,
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

  const required = ["companyName", "contactPerson", "phone", "fleetSize"];
  const missing = missingFields(body, required);
  if (missing.length) {
    return NextResponse.json(
      { ok: false, message: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const {
    companyName,
    contactPerson,
    phone,
    email,
    fleetSize,
    vehicleTypes,
    servicesNeeded,
    maintenanceNeeds,
    additionalInfo,
  } = body;

  const subject = `New Fleet Proposal Request — ${companyName}`;

  const rows = [
    ["Company Name", companyName],
    ["Contact Person", contactPerson],
    ["Phone", phone],
    ["Email", email || "—"],
    ["Number Of Vehicles", fleetSize],
    ["Vehicle Types", vehicleTypes || "—"],
    ["Services Required", servicesNeeded || "—"],
    ["Maintenance Requirements", maintenanceNeeds || "—"],
    ["Additional Information", additionalInfo || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#d5001c;margin-bottom:4px;">New Corporate Fleet Proposal Request</h2>
      <p style="color:#666;margin-top:0;">Monos VW-Audi Service &amp; Parts — fleet enquiry</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:8px 0;color:#888;width:190px;vertical-align:top;">${label}</td><td style="padding:8px 0;white-space:pre-wrap;">${escapeHtml(
                String(value)
              )}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin-top:20px;font-size:12px;color:#999;">Corporate leads are high-value — follow up promptly.</p>
    </div>
  `;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const waMessage =
    `*New Fleet Proposal Request*\n` +
    rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const [emailResult, waResult] = await Promise.all([
    sendEmail({ subject, html, text }),
    sendWhatsApp(waMessage),
  ]);

  await saveEnquiry("fleet", { ...body, receivedAt: new Date().toISOString() });

  return NextResponse.json({
    ok: true,
    message: "Fleet proposal request received.",
    channels: { email: emailResult, whatsapp: waResult },
  });
}
