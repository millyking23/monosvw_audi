"use client";

import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import QuoteForm from "./QuoteForm";

export default function BookingSection() {
  const [tab, setTab] = useState("book");

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#quote") setTab("quote");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <section id="book" className="section-pad">
      <div className="wrap">
        <div className="max-w-[640px] mb-12">
          <div className="eyebrow">Get Started</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Book a service or request a quote
          </h2>
          <p className="mt-4 text-silver">Fill in the form below — we&apos;ll confirm by email and WhatsApp.</p>
        </div>

        <div className="flex gap-2.5 mb-10">
          <button
            className={`tab-btn ${tab === "book" ? "active" : ""}`}
            onClick={() => setTab("book")}
            type="button"
          >
            Book a Service
          </button>
          <button
            id="quote"
            className={`tab-btn ${tab === "quote" ? "active" : ""}`}
            onClick={() => setTab("quote")}
            type="button"
          >
            Request a Quote
          </button>
        </div>

        {tab === "book" ? <BookingForm /> : <QuoteForm />}
      </div>
    </section>
  );
}
