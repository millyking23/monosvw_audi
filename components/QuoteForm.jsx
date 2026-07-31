"use client";

import { useState, useRef } from "react";

export default function QuoteForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = formRef.current;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/quote", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Something went wrong. Please try again.");
      }
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
        <h3 className="text-xl font-display font-semibold text-white">Quote request sent</h3>
        <p className="mt-2.5 text-silver">
          Our estimating team will review your photos and description and send a quotation shortly —
          by email and WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="form-shell" id="quote">
      <form ref={formRef} onSubmit={handleSubmit}>
        {/* Honeypot — hidden from real users, bots tend to fill every field */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          aria-hidden="true"
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="field">
            <label>Customer Name</label>
            <input required name="name" type="text" placeholder="Full name" />
          </div>
          <div className="field">
            <label>Phone / WhatsApp</label>
            <input required name="phone" type="tel" placeholder="+263 7X XXX XXXX" />
          </div>
          <div className="field sm:col-span-2">
            <label>Email (optional)</label>
            <input name="email" type="email" placeholder="you@email.com" />
          </div>
          <div className="field sm:col-span-2">
            <label>Vehicle / Machine</label>
            <input required name="vehicle" type="text" placeholder="e.g. VW Golf 7, 2018" />
          </div>
          <div className="field sm:col-span-2">
            <label>Describe the Issue</label>
            <textarea
              required
              name="issue"
              rows={4}
              placeholder="Tell us what's wrong, any noises, warning lights, or damage..."
            />
          </div>
          <div className="field sm:col-span-2">
            <label>Upload Photos</label>
            <div
              className={`upload-drop ${dragOver ? "drag" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files.length && fileInputRef.current) {
                  fileInputRef.current.files = e.dataTransfer.files;
                  setFileCount(e.dataTransfer.files.length);
                }
              }}
            >
              {fileCount ? `${fileCount} photo(s) selected` : "Drag & drop photos here, or click to browse"}
              <input
                ref={fileInputRef}
                type="file"
                name="photos"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={(e) => setFileCount(e.target.files.length)}
              />
            </div>
          </div>
        </div>

        {status === "error" && <div className="error-box mt-5">{errorMsg}</div>}

        <div className="flex items-center gap-4 flex-wrap mt-7">
          <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" && <span className="spinner" />}
            {status === "loading" ? "Sending..." : "Send Quote Request"}
          </button>
          <span className="text-[0.78rem] text-silver-dim">
            Quotations are typically returned within 24 hours.
          </span>
        </div>
      </form>
    </div>
  );
}
