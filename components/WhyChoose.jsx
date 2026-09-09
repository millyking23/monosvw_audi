import Reveal from "./Reveal";

const ITEMS = [
  { icon: "⚙", title: "Experienced Technicians", text: "Skilled workshop staff focused on practical inspection, servicing and diagnostic fault-finding." },
  { icon: "☉", title: "Vehicle Diagnostics", text: "Computer diagnostic equipment supports accurate fault-finding on modern vehicle systems." },
  { icon: "⏱", title: "Efficient Turnaround", text: "Structured workshop workflows help keep vehicle downtime under control." },
  { icon: "⚖", title: "Parts Supply", text: "Vehicle parts can be sourced to support servicing and repair requirements." },
  { icon: "🛡", title: "Accident Repairs", text: "Panel and paint work is available for vehicle body and accident repair requirements." },
  { icon: "$", title: "Clear Quotations", text: "Request a quotation so the required work and parts can be assessed before repairs proceed." },
  { icon: "★", title: "Established Since 2016", text: "An established Bulawayo automotive workshop serving private, commercial and fleet customers." },
  { icon: "🚚", title: "Fleet Support", text: "Scheduled servicing and repair support can be arranged for business and commercial vehicles." },
];

export default function WhyChoose() {
  return (
    <section id="why" className="section-pad">
      <div className="wrap">
        <div className="max-w-[640px] mx-auto text-center mb-16">
          <div className="eyebrow center">Why Monos</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Professional workshop support in Bulawayo
          </h2>
          <p className="mt-4 text-silver">
            VW and Audi specialists with practical support for servicing, repairs, diagnostics, bodywork and fleet vehicles.
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
