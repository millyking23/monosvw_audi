"use client";

import { useRef, useState, useCallback } from "react";

export default function BeforeAfter() {
  const sliderRef = useRef(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.min(96, Math.max(4, p));
    setPct(p);
  }, []);

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="max-w-[640px] mx-auto text-center mb-16">
          <div className="eyebrow center">Proof Of Work</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Before &amp; after
          </h2>
          <p className="mt-4 text-silver">Drag the slider to compare.</p>
        </div>

        <div
          ref={sliderRef}
          className="ba-slider"
          onMouseDown={(e) => {
            dragging.current = true;
            setFromClientX(e.clientX);
          }}
          onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchStart={(e) => {
            dragging.current = true;
            setFromClientX(e.touches[0].clientX);
          }}
          onTouchMove={(e) => dragging.current && setFromClientX(e.touches[0].clientX)}
          onTouchEnd={() => (dragging.current = false)}
        >
          <div className="ba-layer ba-before">
            <span>Before</span>
          </div>
          <div className="ba-after-clip" style={{ width: `${pct}%` }}>
            <div className="ba-layer">
              <span>After</span>
            </div>
          </div>
          <div className="ba-handle" style={{ left: `${pct}%` }}>
            &#8596;
          </div>
        </div>
        <p className="text-center mt-5 text-[0.78rem] text-silver-dim font-mono-tag tracking-wide">
          Recent vehicles from the Monos workshop floor
        </p>
      </div>
    </section>
  );
}
