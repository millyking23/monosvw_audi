"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";
import PHOTOS from "@/data/workshopPhotos";

const CATEGORIES = [
  "Panel & Paint",
  "Mechanical & Service",
  "Diagnostics",
  "Fleet & Commercial",
  "Workshop",
];

export default function Gallery() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => PHOTOS.filter((photo) => photo.category === category),
    [category]
  );

  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") {
        setSelected((current) => {
          if (!current) return current;
          const index = filtered.findIndex((photo) => photo.src === current.src);
          return filtered[(index + 1) % filtered.length];
        });
      }
      if (event.key === "ArrowLeft") {
        setSelected((current) => {
          if (!current) return current;
          const index = filtered.findIndex((photo) => photo.src === current.src);
          return filtered[(index - 1 + filtered.length) % filtered.length];
        });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected, filtered]);

  return (
    <section id="gallery" className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap">
        <div className="max-w-[760px] mb-10">
          <div className="eyebrow">Monos Workshop Portfolio</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            See the work. Grouped by what we do.
          </h2>
          <p className="mt-4 text-silver">
            Browse real Monos workshop photos by service area — panel beating and paint, mechanical work, diagnostics, fleet vehicles and the workshop itself. Tap any image to view it full screen.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Workshop photo categories">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => { setCategory(item); setSelected(null); }}
              className={`tab-btn ${category === item ? "active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>

        {category === "Panel & Paint" && (
          <div className="mb-12">
            <BeforeAfter />
          </div>
        )}

        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-mono-tag text-[0.68rem] tracking-[0.12em] uppercase text-silver-dim">
            {filtered.length} {filtered.length === 1 ? "photo" : "photos"} · {category}
          </p>
          <a href="/#book" className="text-sm font-semibold text-white hover:text-red-400 transition-colors">
            Need this work? Book Monos →
          </a>
        </div>

        <div className="gallery-grid">
          {filtered.map((photo, index) => (
            <Reveal key={photo.src}>
              <button
                type="button"
                className="gallery-item w-full text-left cursor-zoom-in group"
                onClick={() => setSelected(photo)}
                aria-label={`View ${photo.title}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                  priority={index < 2}
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="tag">
                  <span className="block">{photo.title}</span>
                  <span className="block mt-1 opacity-70 normal-case tracking-normal font-sans">{photo.category}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 p-4 sm:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={(event) => event.target === event.currentTarget && setSelected(null)}
        >
          <button type="button" onClick={() => setSelected(null)} className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 bg-black/60 text-white text-xl" aria-label="Close image">×</button>
          <button
            type="button"
            onClick={() => setSelected((current) => filtered[(filtered.findIndex((photo) => photo.src === current.src) - 1 + filtered.length) % filtered.length])}
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/60 text-white text-2xl"
            aria-label="Previous image"
          >‹</button>
          <div className="relative w-full max-w-5xl h-[78vh]">
            <Image src={selected.src} alt={selected.title} fill sizes="95vw" style={{ objectFit: "contain" }} />
          </div>
          <button
            type="button"
            onClick={() => setSelected((current) => filtered[(filtered.findIndex((photo) => photo.src === current.src) + 1) % filtered.length])}
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-black/60 text-white text-2xl"
            aria-label="Next image"
          >›</button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center max-w-[90vw]">
            <p className="text-white font-semibold">{selected.title}</p>
            <p className="text-silver text-sm mt-1">{selected.description}</p>
            <a href={selected.service} className="inline-block mt-3 text-sm font-semibold text-white hover:text-red-400 transition-colors">
              View this service →
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
