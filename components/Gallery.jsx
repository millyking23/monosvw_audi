"use client";
import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
const VEHICLE_IMAGES = [
  "/images/vehicles-in-service.jpg",
  "/images/vehicles-in-service-2.jpg",
  "/images/vehicles-in-service-3.jpg",
  "/images/vehicles-in-service-4.jpg",
  "/images/vehicles-in-service-5.jpg",
  "/images/vehicles-in-service-6.jpg",
  "/images/vehicles-in-service-7.jpeg",
  "/images/vehicles-in-service-8.jpg",
  "/images/vehicles-in-service-9.jpeg",
  "/images/vehicles-in-service-10.jpeg",
];
const ITEMS = [
  {
    src: "/images/diagnostics-cluster.jpg",
    tag: "Live Diagnostics Readout",
  },
  {
    src: "/images/panel-repair.jpg",
    tag: "Panel & Body Repair — Audi",
  },
  {
    type: "vehicles",
    tag: "Vehicles In Service",
  },
  {
    src: "/images/back-workshop.jpeg",
    tag: "Back Workshop Area",
  },
  {
    src: "/images/customer-dmax.jpg",
    tag: "Customer Vehicle — Isuzu D-Max",
  },
  {
    src: "/images/fleet-truck.jpg",
    tag: "Fleet Vehicle Ready For Dispatch",
  },
];
function VehicleGallery() {
  const [current, setCurrent] = useState(0);
  const previousImage = () => {
    setCurrent((prev) =>
      prev === 0 ? VEHICLE_IMAGES.length - 1 : prev - 1
    );
  };
  const nextImage = () => {
    setCurrent((prev) =>
      prev === VEHICLE_IMAGES.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <div className="gallery-item">
      <Image
        src={VEHICLE_IMAGES[current]}
      alt={Vehicles In Service ${current + 1}}
        fill
        sizes="(max-width: 640px) 50vw, 260px"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      <div className="tag">
        <div className="flex items-center justify-between gap-3">
          <span>Vehicles In Service</span>
          <span className="opacity-80">
            {current + 1} / {VEHICLE_IMAGES.length}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={previousImage}
        aria-label="Previous vehicle image"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/20 hover:bg-red-600 transition"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={nextImage}
        aria-label="Next vehicle image"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/20 hover:bg-red-600 transition"
      >
        ›
      </button>
      <div className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 flex gap-1.5">
        {VEHICLE_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
           aria-label={Go to vehicle image ${index + 1}}
            className={`w-2 h-2 rounded-full transition ${
              index === current
                ? "bg-white scale-125"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
export default function Gallery() {
  return (
    <section
      id="gallery"
      className="section-pad bg-charcoal-2 border-y border-white/[0.08]"
    >
      <div className="wrap">
        <div className="max-w-[640px] mb-16">
          <div className="eyebrow">Inside The Workshop</div>
          <h2
            className="font-display font-semibold text-white"
            style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}
          >
            Gallery
          </h2>
        </div>
        <div className="gallery-grid">
          {ITEMS.map((item) => (
            <Reveal key={item.type || item.src}>
              {item.type === "vehicles" ? (
                <VehicleGallery />
              ) : (
                <div className="gallery-item">
                  <Image
                    src={item.src}
                    alt={item.tag}
                    fill
                    sizes="(max-width: 640px) 50vw, 260px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="tag">
                    {item.tag}
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
