import Reveal from "./Reveal";

const CATEGORIES = [
  {
    num: "01 / ALL MAKES",
    title: "Car Workshop & Mechanical Repairs",
    items: ["All Makes & Models", "Mechanical Repairs", "Vehicle Servicing", "Engine Repairs & Rebuilding", "Suspension Repairs", "Gearbox & Transmission Repairs"],
    cta: { href: "#book", label: "Book This Service" },
    learn: { href: "/areas/bulawayo", label: "Workshop in Bulawayo →" },
  },
  {
    num: "02 / VW & AUDI",
    title: "VW & Audi Specialists",
    items: ["VW Servicing & Repairs", "Audi Servicing & Repairs", "Computer Diagnostics", "Vehicle Programming", "ECU Repairs", "Key Coding & Spare Key Programming"],
    cta: { href: "#book", label: "Book This Service" },
    learn: { href: "/services/vw-service-repairs", label: "VW service & repairs →" },
  },
  {
    num: "03 / DIAGNOSTICS",
    title: "Diagnostics & Auto Electrics",
    items: ["Computer Diagnostics", "Auto Electrical Faults", "Warning Light Diagnosis", "Vehicle Programming", "ECU Diagnostics & Repairs", "Electrical Fault Finding"],
    cta: { href: "#book", label: "Book This Service" },
    learn: { href: "/services/computer-diagnostics", label: "Diagnostics in Bulawayo →" },
  },
  {
    num: "04 / FUEL & PERFORMANCE",
    title: "Fuel System & Performance",
    items: ["Fuel Injector Testing", "Fuel Injector Cleaning", "Fuel System Diagnostics", "Engine Performance Checks", "Air Conditioning", "Exhaust Systems"],
    cta: { href: "#book", label: "Book This Service" },
    learn: { href: "/services/fuel-injector-testing-cleaning", label: "Injector testing & cleaning →" },
  },
  {
    num: "05 / BODY & PAINT",
    title: "Panel Beating & Spray Painting",
    items: ["Panel Beating", "Spray Painting", "Accident Repairs", "Chassis Straightening", "Dent & Body Repairs", "Vehicle Refinishing"],
    cta: { href: "#book", label: "Get a Bodywork Quote" },
    learn: { href: "/services/panel-beating-spray-painting", label: "Panel & paint in Bulawayo →" },
  },
  {
    num: "06 / FLEET & MACHINERY",
    title: "Fleet, Machinery & Parts",
    items: ["Fleet Maintenance", "Machine Repairs", "Construction Equipment Repairs", "On-site Repairs", "Breakdown Assistance", "Vehicle & Machine Parts Supply"],
    cta: { href: "#fleet", label: "Fleet Proposal" },
    learn: { href: "/services/fleet-maintenance", label: "Fleet maintenance in Bulawayo →" },
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap">
        <div className="max-w-[680px] mb-16">
          <div className="eyebrow">Full Workshop Capability</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            One workshop. Cars, diagnostics, bodywork & paint.
          </h2>
          <p className="mt-4 text-silver">
            Monos works on VW, Audi and other makes and models. From routine servicing and mechanical repairs to computer diagnostics, fuel injector testing and cleaning, panel beating and professional spray painting — our Bulawayo workshop covers the job end to end.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Reveal key={cat.title}>
              <div className="service-card p-8 flex flex-col h-full">
                <span className="font-mono-tag text-[0.7rem] text-silver-dim tracking-wider">{cat.num}</span>
                <h3 className="mt-3.5 text-xl font-display font-semibold text-white">{cat.title}</h3>
                <ul className="service-list mt-5 flex flex-col gap-2.5 flex-1">
                  {cat.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a href={cat.cta.href} className="btn btn-ghost btn-sm self-start">{cat.cta.label}</a>
                  {cat.learn && <a href={cat.learn.href} className="text-sm font-medium text-silver hover:text-white">{cat.learn.label}</a>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
