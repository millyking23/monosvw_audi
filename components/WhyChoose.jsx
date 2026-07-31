import Reveal from "./Reveal";

const ITEMS = [
  { icon: "⚙", title: "Certified Technicians", text: "Factory-trained staff working to documented procedures, not guesswork." },
  { icon: "☉", title: "Latest Vehicle Diagnostics", text: "OEM-level diagnostic tooling for accurate fault-finding on modern ECUs." },
  { icon: "⏱", title: "Fast Turnaround", text: "Structured workflows and parts pre-ordering to minimise vehicle downtime." },
  { icon: "⚖", title: "Genuine Parts", text: "Direct sourcing lines for genuine and OEM-equivalent components, worldwide." },
  { icon: "🛡", title: "Insurance Approved Repairs", text: "Accident and panel work carried out to insurer-recognised standards." },
  { icon: "$", title: "Competitive Pricing", text: "Transparent, itemised quotations — no inflated dealership mark-ups." },
  { icon: "★", title: "Trusted Since 2016", text: "Registered with the Motor Industry Association of Zimbabwe." },
  { icon: "🚚", title: "Corporate Fleet Specialists", text: "Scheduled maintenance programmes built for mines, councils and businesses." },
];

export default function WhyChoose() {
  return (
    <section id="why" className="section-pad">
      <div className="wrap">
        <div className="max-w-[640px] mx-auto text-center mb-16">
          <div className="eyebrow center">Why Monos</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Standards you&apos;d expect from a franchise dealer
          </h2>
          <p className="mt-4 text-silver">
            Independent enough to be flexible. Disciplined enough to be trusted with a fleet.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((item) => (
            <Reveal key={item.title}>
              <div className="why-card p-7">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-5 text-red text-lg">
                  {item.icon}
                </div>
                <h4 className="text-white font-display font-semibold mb-2">{item.title}</h4>
                <p className="text-silver text-sm leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
