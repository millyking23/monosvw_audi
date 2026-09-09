"use client";

import Image from "next/image";
import { useState } from "react";

export default function BeforeAfter() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="max-w-[720px] mx-auto text-center mb-12">
          <div className="eyebrow center">Proof Of Work</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Bodywork: from repair to finished result
          </h2>
          <p className="mt-4 text-silver">
            A selection of bodywork images from the Monos workshop. We only use true before-and-after comparisons when both stages of the same job are documented.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-[4/3] bg-black">
              <Image src="/images/panel-repair.jpg" alt="Panel repair work at Monos VW-Audi Service & Parts" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
            <figcaption className="p-5">
              <span className="font-mono-tag text-[0.65rem] uppercase tracking-[0.14em] text-silver-dim">Panel &amp; Paint</span>
              <h3 className="mt-2 text-lg font-semibold text-white">Panel repair in progress</h3>
              <p className="mt-2 text-sm text-silver">Documented panel and body repair work.</p>
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-[4/3] bg-black">
              <Image src="/images/completed-project.jpg" alt="Completed bodywork project at Monos VW-Audi Service & Parts" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
            <figcaption className="p-5">
              <span className="font-mono-tag text-[0.65rem] uppercase tracking-[0.14em] text-silver-dim">Panel &amp; Paint</span>
              <h3 className="mt-2 text-lg font-semibold text-white">Completed bodywork</h3>
              <p className="mt-2 text-sm text-silver">A documented completed repair and finishing result.</p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShowAfter((value) => !value)} className="btn btn-ghost btn-sm" aria-expanded={showAfter}>
            {showAfter ? "Hide comparison note" : "How we document before & after →"}
          </button>
        </div>
        {showAfter && (
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-silver-dim">
            These two images are presented as separate examples rather than claimed as the same vehicle or repair stage. Send us your vehicle photos if you want a specific repair assessed.
          </p>
        )}
      </div>
    </section>
  );
}
