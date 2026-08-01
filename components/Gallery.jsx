import Image from "next/image";
import Reveal from "./Reveal";

const ITEMS = [
  { src: "/images/diagnostics-cluster.jpg", tag: "Live Diagnostics Readout" },
  { src: "/images/panel-repair.jpg", tag: "Panel & Body Repair — Audi" },
  { src: "/images/vehicles-in-service.jpg", tag: "Vehicles In Service" },
  { src: "/images/back-workshop.jpeg", tag: "Back Workshop Area" },
  { src: "/images/customer-dmax.jpg", tag: "Customer Vehicle — Isuzu D-Max" },
  { src: "/images/fleet-truck.jpg", tag: "Fleet Vehicle Ready For Dispatch" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap">
        <div className="max-w-[640px] mb-16">
          <div className="eyebrow">Inside The Workshop</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Gallery
          </h2>
        </div>
        <div className="gallery-grid">
          {ITEMS.map((item) => (
            <Reveal key={item.src}>
              <div className="gallery-item">
                <Image
                  src={item.src}
                  alt={item.tag}
                  fill
                  sizes="(max-width: 640px) 50vw, 260px"
                  style={{ objectFit: "cover" }}
                />
                <div className="tag">{item.tag}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
