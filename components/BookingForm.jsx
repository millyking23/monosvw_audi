"use client";

import { useState, useRef } from "react";

const SERVICES = [
  "Mechanical Repairs",
  "Vehicle Servicing",
  "Computer Diagnostics",
  "Auto Electrics / ECU",
  "Panel Beating & Spray Painting",
  "Brakes / Suspension / Gearbox",
  "Fuel Injector Cleaning",
  "Fleet Maintenance",
  "Other",
];

export default function BookingForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(formRef.current);
    if (fd.get("company_website")) {
      setStatus("success"); // silently succeed for bots
      return;
    }

    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      vehicleMake: fd.get("vehicleMake"),
      vehicleModel: fd.get("vehicleModel"),
      year: fd.get("year"),
      service: fd.get("service"),
      date: fd.get("date"),
      time: fd.get("time"),
      notes: fd.get("notes"),
    };

    try {
      const res = await fetch("/api/booking", {
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

  if (status === "success") {
    return (
      <div className="form-shell text-center py-10">
        <div className="confirm-icon">&#10003;</div>
        <h3 className="text-xl font-display font-semibold text-white">Booking received</h3>
        <p className="mt-2.5 text-silver">
          Thank you — our service desk will confirm your appointment by email and WhatsApp shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="form-shell">
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
          <div className="field"><label>Customer Name</label><input required name="name" type="text" placeholder="Full name" /></div>
          <div className="field"><label>Phone</label><input required name="phone" type="tel" placeholder="+263 7X XXX XXXX" /></div>
          <div className="field"><label>Email</label><input name="email" type="email" placeholder="you@email.com" /></div>
          <div className="field"><label>Vehicle Make</label><input required name="vehicleMake" type="text" placeholder="e.g. Audi" /></div>
          <div className="field"><label>Vehicle Model</label><input required name="vehicleModel" type="text" placeholder="e.g. Q5" /></div>
          <div className="field"><label>Year</label><input name="year" type="number" placeholder="e.g. 2019" min="1970" max="2027" /></div>
          <div className="field sm:col-span-2">
            <label>Service Needed</label>
            <select required name="service" defaultValue="">
              <option value="" disabled>Select a service</option>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="field"><label>Preferred Date</label><input name="date" type="date" /></div>
          <div className="field"><label>Preferred Time</label><input name="time" type="time" /></div>
          <div className="field sm:col-span-2">
            <label>Additional Notes</label>
            <textarea name="notes" rows={4} placeholder="Describe the issue or request..." />
          </div>
        </div>

        {status === "error" && <div className="error-box mt-5">{errorMsg}</div>}

        <div className="flex items-center gap-4 flex-wrap mt-7">
          <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" && <span className="spinner" />}
            {status === "loading" ? "Sending..." : "Schedule Service"}
          </button>
          <span className="text-[0.78rem] text-silver-dim">
            You&apos;ll receive an email + WhatsApp confirmation once submitted.
          </span>
        </div>
      </form>
    </div>
  );
}
