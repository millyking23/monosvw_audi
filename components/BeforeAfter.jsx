"use client";

import Image from "next/image";
import { useState } from "react";

const clamp = (value) => Math.min(100, Math.max(0, value));

export default function BeforeAfter({ embedded = false }) {
  const [position, setPosition] = useState(50);

  const updateFromPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition(clamp(((event.clientX - rect.left) / rect.width) * 100));
  };

  const comparison = (
    <div
      className={`relative overflow-hidden select-none touch-none cursor-ew-resize ${embedded ? "absolute inset-0 h-full w-full rounded-none border-0" : "aspect-[4/3] rounded-2xl border border-white/10 bg-black"}`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromPointer(event);
      }}
      onPointerMove={(event) => {
        if (event.buttons !== 1) return;
        updateFromPointer(event);
      }}
      role="slider"
      aria-label="Drag to compare Isuzu before and after bodywork"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setPosition((value) => clamp(value - 5));
        if (event.key === "ArrowRight") setPosition((value) => clamp(value + 5));
      }}
    >
      <Image
        src="/images/completed-project.jpg"
        alt="Isuzu before panel beating and spray painting at Monos"
        fill
        sizes="(max-width: 768px) 100vw, 1024px"
        priority
        style={{ objectFit: "cover" }}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${position}% 0 0)` }}
        aria-hidden="true"
      >
        <Image
          src="/images/customer-dmax.jpg"
          alt="Completed Isuzu panel beating and spray painting result at Monos"
          fill
          sizes="(max-width: 768px) 100vw, 1024px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 font-mono-tag text-[0.62rem] uppercase tracking-[0.14em] text-white">
        After
      </span>
      <span className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 font-mono-tag text-[0.62rem] uppercase tracking-[0.14em] text-white">
        Before
      </span>

      <div
        className="absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_18px_rgba(0,0,0,.6)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-black/80 text-white shadow-xl">
          <span className="text-xl leading-none" aria-hidden="true">↔</span>
          <span className="sr-only">Drag to compare</span>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="gallery-item w-full group">
        {comparison}
        <div className="tag">
          <span className="block">Isuzu Before &amp; After</span>
          <span className="block mt-1 opacity-70 normal-case tracking-normal font-sans">Panel &amp; Paint · drag left for after, right for before</span>
        </div>
      </div>
    );
  }

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="max-w-[760px] mx-auto text-center mb-10">
          <div className="eyebrow center">Panel &amp; Paint</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Isuzu before &amp; after
          </h2>
          <p className="mt-4 text-silver">
            Drag the handle left to reveal more of the finished Isuzu. Drag it right to reveal more of the vehicle before the bodywork.
          </p>
        </div>
        {comparison}
        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <p className="font-mono-tag text-[0.65rem] uppercase tracking-[0.14em] text-silver-dim">Isuzu • Panel &amp; Paint</p>
          <p className="text-sm text-silver">← AFTER · drag left &nbsp;|&nbsp; drag right · BEFORE →</p>
        </div>
      </div>
    </section>
  );
}
