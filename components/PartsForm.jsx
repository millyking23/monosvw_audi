"use client";

import { useState, useRef } from "react";

export default function PartsForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setWhatsappLink("");
    const form = formRef.current;
    try {
      const res = await fetch("/api/parts", { method: "POST", body: new FormData(form) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.message || "Something went wrong. Please try again.");
      setWhatsappLink(json.whatsappLink || "");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return <div className="form-shell text-center py-10">
      <div className="confirm-icon">&#10003;</div>
      <h3 className="text-xl font-display font-semibold text-white">Parts request received</h3>
      <p className="mt-2.5 text-silver">We’ll check availability and sourcing options in South Africa and contact you with pricing and expected delivery details.</p>
      {whatsappLink && <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary inline-flex mt-5">Continue on WhatsApp</a>}
    </div>;
  }

  return <div className="form-shell">
    <form ref={formRef} onSubmit={handleSubmit}>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" style={{ position:"absolute", left:"-9999px", width:1, height:1, opacity:0 }} aria-hidden="true" />
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="field"><label>Customer Name</label><input required name="name" type="text" placeholder="Full name" /></div>
        <div className="field"><label>Phone / WhatsApp</label><input required name="phone" type="tel" placeholder="+263 7X XXX XXXX" /></div>
        <div className="field"><label>Vehicle Make & Model</label><input required name="vehicle" type="text" placeholder="e.g. Toyota Hilux 2019" /></div>
        <div className="field"><label>Year</label><input name="year" type="text" placeholder="e.g. 2019" /></div>
        <div className="field sm:col-span-2"><label>Part Required</label><input required name="part" type="text" placeholder="e.g. Left front fender, alternator, door, bumper" /></div>
        <div className="field sm:col-span-2"><label>Additional Details</label><textarea name="details" rows={4} placeholder="Tell us the side, colour, engine size, part number or anything else that helps identify the part." /></div>
        <div className="field sm:col-span-2">
          <label>Photo of Vehicle / Part (optional)</label>
          <div className="upload-drop" onClick={() => fileInputRef.current?.click()}>
            {fileCount ? `${fileCount} photo(s) selected` : "Click to upload a photo"}
            <input ref={fileInputRef} type="file" name="photos" accept="image/*" multiple style={{display:"none"}} onChange={e => setFileCount(e.target.files.length)} />
          </div>
        </div>
      </div>
      {status === "error" && <div className="error-box mt-5">{errorMsg}</div>}
      <div className="flex items-center gap-4 flex-wrap mt-7">
        <button type="submit" className="btn btn-primary" disabled={status === "loading"}>{status === "loading" ? "Sending..." : "Request Part"}</button>
        <span className="text-[0.78rem] text-silver-dim">Parts are sourced from South Africa and are supplied on order.</span>
      </div>
    </form>
  </div>;
}
