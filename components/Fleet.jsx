import Reveal from "./Reveal";

const TARGETS = [
  "Mining Companies", "Government", "Schools", "NGOs",
  "Construction Companies", "Transport Companies", "Hospitals", "Private Businesses",
];

const BENEFITS = [
  { n: "01", t: "Preventative Maintenance", d: "Scheduled inspections that catch faults before they become breakdowns." },
  { n: "02", t: "Fleet Management", d: "Centralised service history and reporting across every vehicle you run." },
  { n: "03", t: "Scheduled Servicing", d: "Rotation-based servicing that keeps vehicles moving, not queued." },
  { n: "04", t: "Priority Repairs", d: "Contracted fleets jump the queue when something needs urgent attention." },
  { n: "05", t: "Bulk Servicing", d: "Volume-based rates for multi-vehicle service and parts contracts." },
];

export default function Fleet() {
  return (
    <section id="fleet" className="section-pad" style={{ background: "linear-gradient(160deg,var(--charcoal),var(--black))" }}>
      <div className="wrap grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="eyebrow">Corporate Fleet Solutions</div>
          <Reveal>
            <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
              Keep every vehicle in your fleet mission-ready
            </h2>
          </Reveal>
          <p className="mt-5 text-silver leading-relaxed">
  Dedicated fleet programmes built for organisations that can&apos;t afford downtime — scheduled
  around your operations, priced for volume. Trusted by corporate fleets, public-sector
  organisations, schools, institutions, and businesses across Bulawayo.
</p>
          <div className="flex flex-wrap gap-2.5 mt-6">
            {TARGETS.map((t) => (
              <span key={t} className="fleet-tag">{t}</span>
            ))}
          </div>
          <a href="#fleet-form" className="btn btn-primary mt-8 inline-flex">
            Request a Fleet Proposal
          </a>
        </div>
        <div className="border border-white/[0.08] rounded-xl2 overflow-hidden">
          {BENEFITS.map((b) => (
            <Reveal key={b.n}>
              <div className="fleet-benefit">
                <span className="font-mono-tag text-red text-sm">{b.n}</span>
                <div>
                  <h4 className="text-white font-display font-semibold mb-1">{b.t}</h4>
                  <p className="text-silver text-sm">{b.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
