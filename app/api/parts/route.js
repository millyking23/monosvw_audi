import { NextResponse } from "next/server";
import { sendEmail, sendWhatsApp, isRateLimited, honeypotTripped, saveEnquiry, escapeHtml } from "@/lib/notify";

export const runtime = "nodejs";
export const maxDuration = 30;

function getIp(req) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "unknown";
}

export async function POST(req) {
  const ip = getIp(req);
  if (isRateLimited(ip)) return NextResponse.json({ ok:false, message:"Too many requests. Please try again shortly." }, { status:429 });

  let form;
  try { form = await req.formData(); } catch { return NextResponse.json({ok:false,message:"Invalid form submission."},{status:400}); }

  const get = key => form.get(key) ? String(form.get(key)) : "";
  if (honeypotTripped({company_website:get("company_website")})) return NextResponse.json({ok:true});

  const name=get("name"), phone=get("phone"), vehicle=get("vehicle"), year=get("year"), part=get("part"), details=get("details");
  if (!name.trim() || !phone.trim() || !vehicle.trim() || !part.trim()) {
    return NextResponse.json({ok:false,message:"Please complete your name, phone, vehicle and part required fields."},{status:400});
  }

  const files=form.getAll("photos").filter(f => f && typeof f.arrayBuffer === "function" && f.size > 0);
  const attachments=[];
  let total=0;
  for (const file of files) {
    total += file.size;
    if (total > 8*1024*1024) break;
    attachments.push({filename:file.name || "photo.jpg", content:Buffer.from(await file.arrayBuffer()), contentType:file.type || "image/jpeg"});
  }

  const subject=`New Parts Request — ${name} (${vehicle})`;
  const html=`<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;"><h2 style="color:#d5001c;">New Parts Request</h2><p>Parts enquiry from the Monos website.</p><table style="width:100%;border-collapse:collapse;font-size:14px;"><tr><td>Name</td><td><strong>${escapeHtml(name)}</strong></td></tr><tr><td>Phone / WhatsApp</td><td>${escapeHtml(phone)}</td></tr><tr><td>Vehicle</td><td>${escapeHtml(vehicle)}</td></tr><tr><td>Year</td><td>${escapeHtml(year || "—")}</td></tr><tr><td>Part Required</td><td><strong>${escapeHtml(part)}</strong></td></tr><tr><td>Details</td><td style="white-space:pre-wrap;">${escapeHtml(details || "—")}</td></tr><tr><td>Photos</td><td>${attachments.length ? attachments.length+" attached" : "None"}</td></tr></table><p>Parts are requested for sourcing from South Africa.</p></div>`;
  const text=`NEW PARTS REQUEST\n\nName: ${name}\nPhone: ${phone}\nVehicle: ${vehicle}\nYear: ${year || "—"}\nPart: ${part}\nDetails: ${details || "—"}\nPhotos: ${attachments.length} attached`;
  const waMessage=`*New Parts Request*\nName: ${name}\nPhone: ${phone}\nVehicle: ${vehicle}\nYear: ${year || "—"}\nPart: ${part}\nDetails: ${details || "—"}`;

  const [emailResult, waResult] = await Promise.all([
    sendEmail({subject,html,text,attachments}),
    sendWhatsApp(waMessage)
  ]);
  await saveEnquiry("parts", {name,phone,vehicle,year,part,details,photoCount:attachments.length,receivedAt:new Date().toISOString()});

  const number=String(process.env.WHATSAPP_TO_NUMBER || "263712579531").replace(/[^0-9]/g,"");
  return NextResponse.json({ok:true, whatsappLink:`https://wa.me/${number}?text=${encodeURIComponent(waMessage)}`, channels:{email:emailResult,whatsapp:waResult}});
}
