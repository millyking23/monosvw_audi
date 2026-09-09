"use client";

import Image from "next/image";
import { useState } from "react";

const clamp = (value) => Math.min(100, Math.max(0, value));

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);

  const updateFromPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition(clamp(((event.clientX - rect.left) / rect.width) * 100));
  };

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="max-w-[760px] mx-auto text-center mb-12">
          <div className="eyebrow center">Panel &amp; Paint</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Before &amp; after. Move the slider.
          </h2>
          <p className="mt-4 text-silver">
            Drag the handle left to reveal more of the finished D-Max. Drag it right to reveal more of the vehicle before the work.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black select-none touch-none cursor-ew-resize"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              updateFromPointer(event);
            }}
            onPointerMove={(event) => {
              if (event.buttons !== 1) return;
              updateFromPointer(event);
            }}
            role="slider"
            aria-label="Drag to compare D-Max before and after"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") setPosition((value) => clamp(value - 5));
              if (event.key === "ArrowRight") setPosition((value) => clamp(value + 5));
            }}
          >
            {/* BEFORE stays underneath. Moving the handle right exposes more BEFORE. */}
            <Image
              src="/images/completed-project.jpg"
              alt="D-Max before bodywork and paint work at Monos"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              priority
              style={{ objectFit: "cover" }}
            />

            {/* AFTER covers the left side. Moving the handle left exposes more AFTER. */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${100 - position}%` }}
              aria-hidden="true"
            >
              <div className="relative h-full w-[100vw] max-w-5xl">
                <Image
                  src="/images/customer-dmax.jpg"
                  alt="Completed D-Max bodywork and paint result at Monos"
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <span className="absolute top-5 left-5 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 font-mono-tag text-[0.65rem] uppercase tracking-[0.14em] text-white">
              After
            </span>
            <span className="absolute top-5 right-5 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 font-mono-tag text-[0.65rem] uppercase tracking-[0.14em] text-white">
              Before
            </span>

            <div
              className="absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_18px_rgba(0,0,0,.6)]"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black/80 text-white shadow-xl">
                <span className="text-2xl leading-none" aria-hidden="true">↔</span>
                <span className="sr-only">Drag to compare</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <p className="font-mono-tag text-[0.65rem] uppercase tracking-[0.14em] text-silver-dim">
              D-Max • Panel &amp; Paint
            </p>
            <p className="text-sm text-silver">← Move left for AFTER · Move right for BEFORE →</p>
          </div>
        </div>
      </div>
    </section>
  );
}
