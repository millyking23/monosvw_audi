import Image from "next/image";
import Reveal from "./Reveal";
import PHOTOS from "@/data/workshopPhotos";

const FEATURED_SRCS = [
  "/images/panel-repair.jpg",
  "/images/completed-project.jpg",
  "/images/diagnostics-cluster.jpg",
  "/images/fleet-truck.jpg",
  "/images/customer-dmax.jpg",
  "/images/back-workshop.jpeg",
];

const CTA_BY_CATEGORY = {
  "Panel & Paint": "View panel & paint service →",
  "Diagnostics": "View diagnostics →",
  "Fleet & Commercial": "View fleet service →",
  "Mechanical & Service": "View mechanical service →",
  Workshop: "View workshop service →",
};

export default function WorkshopPortfolio() {
  const featured = FEATURED_SRCS
    .map((src) => PHOTOS.find((photo) => photo.src === src))
    .filter(Boolean);

  return (
    <section id="work" className="section-pad border-y border-white/[0.08]">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end mb-14">
          <div>
            <div className="eyebrow">Selected Workshop Work</div>
            <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
              Real workshop photos. Real service areas.
            </h2>
          </div>
          <p className="text-silver max-w-[620px] lg:justify-self-end">
            A selection from the Monos workshop photo catalogue. The images are presented as examples of the vehicles, workshop areas and work documented in our photo collection — without implying that separate photos are from the same repair job.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, index) => (
            <Reveal key={item.src}>
              <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src={item.src}
                    alt={`${item.title} — Monos VW-Audi Service & Parts`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/65 px-3 py-1 font-mono-tag text-[0.65rem] tracking-wider text-white">
                    {String(index + 1).padStart(2, "0")} / {item.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-silver">{item.description}</p>

                  <div className="mt-5">
                    <p className="font-mono-tag text-[0.62rem] uppercase tracking-[0.14em] text-silver-dim">Service area</p>
                    <p className="mt-2 text-sm text-white">{item.category}</p>
                  </div>

                  <a href={item.service} className="mt-6 text-sm font-semibold text-white hover:text-red-400 transition-colors">
                    {CTA_BY_CATEGORY[item.category] || "View service →"}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div>
            <p className="font-semibold text-white">Want to see more?</p>
            <p className="mt-1 text-sm text-silver">Browse the full workshop photo gallery by service area.</p>
          </div>
          <a href="#gallery" className="btn btn-ghost btn-sm">Open full gallery →</a>
        </div>
      </div>
    </section>
  );
}
