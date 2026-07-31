import Reveal from "./Reveal";

const CATEGORIES = [
  {
    num: "01 / MECHANICAL",
    title: "Mechanical & Servicing",
    items: ["Mechanical Repairs", "Vehicle Servicing", "Engine Rebuilding", "Suspension Repairs", "Gearbox Repairs", "Transmission Repairs"],
    cta: { href: "#book", label: "Book This Service" },
  },
  {
    num: "02 / DIAGNOSTICS",
    title: "Diagnostics & Electrics",
    items: ["Computer Diagnostics", "Auto Electrics", "Vehicle Programming", "ECU Repairs", "Key Coding & Lost Key Replacement", "Spare Key Programming"],
    cta: { href: "#book", label: "Book This Service" },
  },
  {
    num: "03 / COMFORT SYSTEMS",
    title: "Comfort & Core Systems",
    items: ["Air Conditioning", "Brake Systems", "Exhaust Systems", "Gaskets & Seals", "Fuel Injector Cleaning"],
    cta: { href: "#book", label: "Book This Service" },
  },
  {
    num: "04 / BODY & PAINT",
    title: "Panel & Paint Shop",
    items: ["Panel Beating", "Spray Painting", "Accident Repairs", "Chassis Straightening"],
    cta: { href: "#book", label: "Book This Service" },
  },
  {
    num: "05 / FLEET & MACHINERY",
    title: "Fleet & Heavy Machinery",
    items: ["Fleet Maintenance", "Machine Repairs", "Construction Equipment Repairs", "On-site Repairs", "Breakdown Assistance"],
    cta: { href: "#fleet", label: "Fleet Proposal" },
  },
  {
    num: "06 / PARTS & SUPPLY",
    title: "Parts & Supply",
    items: ["Vehicle Parts Supply", "Machine Parts Supply", "Tyres", "Lubricants", "Battery Supply"],
    cta: { href: "#quote", label: "Request Quote" },
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap">
        <div className="max-w-[640px] mb-16">
          <div className="eyebrow">Full Capability</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Engineering services, end to end
          </h2>
          <p className="mt-4 text-silver">
            From a single diagnostic scan to a full accident rebuild — every service below is carried out
            in-house at our Bulawayo workshop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Reveal key={cat.title}>
              <div className="service-card p-8 flex flex-col h-full">
                <span className="font-mono-tag text-[0.7rem] text-silver-dim tracking-wider">{cat.num}</span>
                <h3 className="mt-3.5 text-xl font-display font-semibold text-white">{cat.title}</h3>
                <ul className="service-list mt-5 flex flex-col gap-2.5 flex-1">
                  {cat.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a href={cat.cta.href} className="btn btn-ghost btn-sm mt-6 self-start">
                  {cat.cta.label}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
