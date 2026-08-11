import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <div className="eyebrow">Who We Are</div>
          <Reveal>
            <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
              Precision automotive engineering, built on the workshop floor
            </h2>
          </Reveal>

          <div className="mt-6 space-y-5 text-silver leading-relaxed">
            <p>
              <strong className="text-white">Monos VW-Audi Service &amp; Parts (Pvt) Ltd</strong> was founded in{" "}
              <strong className="text-white">2016</strong> as a Bulawayo-based automotive engineering company,
              built by technicians who trained on German precision and never let go of the standard. What began
              as a specialist Volkswagen and Audi workshop has grown into a full-service engineering operation
              trusted by private owners, corporates, mines and government fleets across Zimbabwe.
            </p>
            <p>
              We combine <strong className="text-white">certified diagnostic technology</strong> with hands-on
              mechanical craft &mdash; from ECU programming and auto-electrics to full engine rebuilds, panel
              beating and spray painting &mdash; backed by a global network for sourcing genuine parts.
            </p>
            <p className="italic text-silver-dim">&ldquo;What is MADE, we can FIX.&rdquo;</p>
          </div>

          <div className="client-badge mt-2">
            &#9878; Registered Member — Motor Industry Association of Zimbabwe
          </div>

          <Reveal>
            <div className="about-photo mt-7">
              <Image
                src="/images/workshop-about.jpg"
                alt="Inside the Monos workshop, Bulawayo"
                fill
                sizes="(max-width: 900px) 100vw, 600px"
                style={{ objectFit: "cover" }}
              />
              <span className="cap">Inside The Monos Workshop &mdash; Bulawayo</span>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4 mt-7">
            <div className="pillar">
              <div className="eyebrow text-[0.62rem]" style={{ color: "var(--blue)" }}>Mission</div>
              <p className="text-silver text-sm leading-snug">
                Deliver dealership-grade engineering and honest service to every vehicle owner in Zimbabwe,
                regardless of make or model.
              </p>
            </div>
            <div className="pillar">
              <div className="eyebrow text-[0.62rem]" style={{ color: "var(--blue)" }}>Vision</div>
              <p className="text-silver text-sm leading-snug">
                To be Southern Region&apos;s most trusted independent automotive engineering house for premium
                and commercial vehicles.
              </p>
            </div>
          </div>
        </div>

        <div className="timeline">
          {[
            {
              y: "2016 — FOUNDATION",
              t: "A specialist VW & Audi workshop opens",
              d: "Monos begins as a dedicated Volkswagen and Audi service point in Bulawayo, built around genuine diagnostic tooling.",
            },
            {
              y: "EXPANSION",
              t: "Panel, paint & auto-electric capability added",
              d: "In-house body shop, spray booth and auto-electrical bay brought online to handle accident repairs end-to-end.",
            },
            {
              y: "CORPORATE GROWTH",
              t: "Fleet contracts with mines, councils & telecoms",
              d: "Preventative maintenance programmes launched for clients including Bulawayo City Council, Econet Wireless and Telecel.",
            },
            {
              y: "TODAY",
              t: "All-marque engineering, genuine parts sourcing",
              d: "A registered member of the Motor Industry Association of Zimbabwe, servicing every major brand with worldwide sourcing for genuine and OEM-equivalent parts.",
            },
          ].map((item) => (
            <Reveal key={item.t}>
              <div className="tl-item">
                <div className="font-mono-tag text-red text-[0.78rem] tracking-wider">{item.y}</div>
                <h4 className="mt-1.5 text-lg font-display font-semibold text-white">{item.t}</h4>
                <p className="mt-2 text-silver text-sm leading-relaxed">{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
