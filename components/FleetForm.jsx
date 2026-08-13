"use client";

import { useState, useRef } from "react";
import Reveal from "./Reveal";

export default function FleetForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(formRef.current);
    if (fd.get("company_website")) {
      setStatus("success");
      return;
    }

    const payload = {
      companyName: fd.get("companyName"),
      contactPerson: fd.get("contactPerson"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      fleetSize: fd.get("fleetSize"),
      vehicleTypes: fd.get("vehicleTypes"),
      servicesNeeded: fd.get("servicesNeeded"),
      maintenanceNeeds: fd.get("maintenanceNeeds"),
      additionalInfo: fd.get("additionalInfo"),
    };

    try {
      const res = await fetch("/api/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.message || "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="fleet-form" className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap">
        <div className="max-w-[640px] mb-14">
          <div className="eyebrow">Corporate Enquiry</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Request a fleet maintenance proposal
          </h2>
          <p className="mt-4 text-silver">
            Tell us about your fleet and we&apos;ll put together a scheduled maintenance programme and pricing.
          </p>
        </div>

        {status === "success" ? (
          <Reveal>
            <div className="form-shell text-center py-10 max-w-[640px] mx-auto">
              <div className="confirm-icon">&#10003;</div>
              <h3 className="text-xl font-display font-semibold text-white">Fleet proposal request received</h3>
              <p className="mt-2.5 text-silver">
                Thank you — our fleet team has received your requirements and will contact you to discuss the proposal.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="form-shell max-w-[820px] mx-auto">
            <form ref={formRef} onSubmit={handleSubmit}>
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="field"><label>Company Name</label><input required name="companyName" type="text" placeholder="Your company" /></div>
                <div className="field"><label>Contact Person</label><input required name="contactPerson" type="text" placeholder="Full name" /></div>
                <div className="field"><label>Phone</label><input required name="phone" type="tel" placeholder="+263 7X XXX XXXX" /></div>
                <div className="field"><label>Email</label><input name="email" type="email" placeholder="you@company.com" /></div>
                <div className="field"><label>Number Of Vehicles</label><input required name="fleetSize" type="number" min="1" placeholder="e.g. 12" /></div>
                <div className="field"><label>Vehicle Types</label><input name="vehicleTypes" type="text" placeholder="e.g. sedans, pickups, trucks" /></div>
                <div className="field sm:col-span-2"><label>Services Required</label><input name="servicesNeeded" type="text" placeholder="e.g. servicing, diagnostics, tyres" /></div>
                <div className="field sm:col-span-2">
                  <label>Maintenance Requirements</label>
                  <textarea name="maintenanceNeeds" rows={3} placeholder="Scheduled servicing frequency, priority repairs, etc." />
                </div>
                <div className="field sm:col-span-2">
                  <label>Additional Information</label>
                  <textarea name="additionalInfo" rows={3} placeholder="Anything else we should know" />
                </div>
              </div>

              {status === "error" && <div className="error-box mt-5">{errorMsg}</div>}

              <div className="flex items-center gap-4 flex-wrap mt-7">
                <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
                  {status === "loading" && <span className="spinner" />}
                  {status === "loading" ? "Sending..." : "Request Fleet Proposal"}
                </button>
                <span className="text-[0.78rem] text-silver-dim">
                  Your request is sent securely to the Monos fleet team.
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
