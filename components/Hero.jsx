"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let cur = 0;
            const step = Math.max(1, Math.ceil(target / 60));
            const t = setInterval(() => {
              cur += step;
              if (cur >= target) {
                cur = target;
                clearInterval(t);
              }
              setValue(cur);
            }, 20);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <b ref={ref} className="block font-display text-3xl font-bold text-white">
      {value.toLocaleString()}
      {suffix}
    </b>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-end pb-24 overflow-hidden bg-black">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="relative z-10 max-w-wrap mx-auto px-8 w-full">
        <div className="hero-badge">
          <Image src="/images/logo-lockup.jpg" alt="Monos VW-Audi Service & Parts" width={190} height={64} style={{ height: 26, width: "auto" }} />
        </div>

        <div className="hud-line max-w-[560px] mb-8">
          <span className="dot" />
          <span>OBD-II LINK ACTIVE // BULAWAYO WORKSHOP · EST. 2016</span>
          <span className="bar" />
        </div>

        <h1
          className="font-display font-semibold text-white max-w-[14ch]"
          style={{ fontSize: "clamp(2.6rem,7vw,5.6rem)", lineHeight: 1.05, textShadow: "0 4px 40px rgba(0,0,0,.5)" }}
        >
          Auto Engineering Confidence.
          <br />
          <span className="text-red">Driving Excellence.</span>
        </h1>

        <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-silver">
          Specialists in Volkswagen, Audi and all vehicle brands since 2016. Trusted by individuals,
          businesses, mines and organisations across Zimbabwe.
        </p>

        <div className="flex flex-wrap gap-4 mt-11">
          <a href="#book" className="btn btn-primary">Book Service</a>
          <a href="#quote" className="btn btn-ghost">Request Quote</a>
          <a href="https://wa.me/263712579531" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            WhatsApp Us
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <Counter target={2016} />
            <span className="font-mono-tag text-[0.66rem] tracking-wider uppercase text-silver-dim">Founded In</span>
          </div>
          <div>
            <Counter target={4200} />
            <span className="font-mono-tag text-[0.66rem] tracking-wider uppercase text-silver-dim">Vehicles Serviced</span>
          </div>
          <div>
            <Counter target={60} />
            <span className="font-mono-tag text-[0.66rem] tracking-wider uppercase text-silver-dim">Corporate Fleet Clients</span>
          </div>
          <div>
            <Counter target={95} suffix="%" />
            <span className="font-mono-tag text-[0.66rem] tracking-wider uppercase text-silver-dim">Genuine Parts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
