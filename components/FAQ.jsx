"use client";

import { useState } from "react";

const FAQS = [
  { q: "Do you service brands other than VW and Audi?", a: "Yes — while VW and Audi are our specialisation, we service all makes and models including BMW, Mercedes-Benz, Toyota, Ford, Nissan, Mazda, Isuzu, Hyundai, Kia and Land Rover." },
  { q: "Can you handle accident repairs?", a: "Yes, our panel and paint shop carries out accident repairs, including chassis straightening and careful body and paint finishing." },
  { q: "Do you offer breakdown assistance?", a: "Yes, including on-site repairs for fleet and construction equipment. Use the emergency breakdown button on this site or call us directly." },
  { q: "How do I set up a corporate fleet contract?", a: "Submit a request via the fleet proposal form or contact us directly — we'll design a scheduled maintenance programme around your fleet size and operations." },
  { q: "Can I track the progress of my vehicle's repair?", a: "A customer portal for live service tracking is in development. In the meantime, our service desk provides WhatsApp progress updates." },
  { q: "Are you an established automotive business?", a: "Yes — Monos VW-Audi Service & Parts (Pvt) Ltd was established in Bulawayo in 2016 and provides vehicle servicing, repairs, diagnostics, bodywork, parts and fleet support." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section-pad bg-charcoal-2 border-y border-white/[0.08]" aria-labelledby="faq-heading">
      <div className="wrap">
        <div className="max-w-[640px] mb-14">
          <div className="eyebrow">Questions</div>
          <h2 id="faq-heading" className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Frequently asked questions
          </h2>
        </div>
        <div className="max-w-[820px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const answerId = `faq-answer-${i}`;
            return (
              <div key={f.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center text-left text-white font-medium faq-q"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="plus" aria-hidden="true">+</span>
                </button>
                <div id={answerId} role="region" aria-hidden={!isOpen} className="faq-a" style={{ maxHeight: isOpen ? "220px" : "0px" }}>
                  <p className="pt-3.5 text-silver text-sm leading-relaxed max-w-[70ch]">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
