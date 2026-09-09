"use client";

import Image from "next/image";

const TRUST_POINTS = [
  ["2016", "Established in Bulawayo"],
  ["VW · AUDI", "Specialist focus"],
  ["ALL MAKES", "Vehicle servicing & repairs"],
  ["LOCAL", "Donnington workshop"],
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-black">
      <Image
        src="/images/workshop-hero.jpg"
        alt="Monos VW-Audi Service & Parts vehicle workshop in Bulawayo"
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative z-10 max-w-wrap mx-auto px-8 w-full">
        <div className="hero-badge">
          <Image src="/images/logo-lockup.jpg" alt="Monos VW-Audi Service & Parts" width={190} height={64} style={{ height: 26, width: "auto" }} />
        </div>

        <div className="hud-line max-w-[560px] mb-8">
          <span className="dot" />
          <span>VW &amp; AUDI SPECIALISTS // ALL MAKES · BULAWAYO · EST. 2016</span>
          <span className="bar" />
        </div>

        <h1
          className="font-display font-semibold text-white max-w-[15ch]"
          style={{ fontSize: "clamp(2.6rem,7vw,5.6rem)", lineHeight: 1.05, textShadow: "0 4px 40px rgba(0,0,0,.5)" }}
        >
          VW &amp; Audi Car Service,
          <br />
          <span className="text-red">Repairs &amp; Diagnostics in Bulawayo.</span>
        </h1>

        <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-silver">
          Monos is a Bulawayo car workshop specialising in Volkswagen and Audi, while servicing other makes and models too.
          From mechanical repairs and computer diagnostics to fuel injector testing and cleaning, panel beating and professional spray painting, we handle the job from diagnosis to completion.
        </p>

        <div className="flex flex-wrap gap-4 mt-11">
          <a href="#book" className="btn btn-primary">Book Service</a>
          <a href="#quote" className="btn btn-ghost">Request Quote</a>
          <a href="https://wa.me/263712579531" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="Contact Monos on WhatsApp">
            WhatsApp Us
          </a>
        </div>

        <div className="hero-stats">
          {TRUST_POINTS.map(([value, label]) => (
            <div key={label}>
              <b className="block font-display text-2xl sm:text-3xl font-bold text-white">{value}</b>
              <span className="font-mono-tag text-[0.66rem] tracking-wider uppercase text-silver-dim">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
