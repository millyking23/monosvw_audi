import Image from "next/image";
import Reveal from "./Reveal";

const CASES = [
  {
    number: "01",
    category: "Panel & Paint",
    title: "Body Repair & Refinishing",
    image: "/images/panel-repair.jpg",
    summary: "Panel and body repair work documented on the workshop floor.",
    work: ["Panel repair", "Bodywork", "Vehicle refinishing"],
    service: "/services/panel-beating-spray-painting",
    cta: "Panel & paint service →",
  },
  {
    number: "02",
    category: "Panel & Paint",
    title: "Completed Bodywork",
    image: "/images/completed-project.jpg",
    summary: "A completed vehicle bodywork project showing the finished result.",
    work: ["Body repair", "Finishing work", "Paint-ready presentation"],
    service: "/services/panel-beating-spray-painting",
    cta: "View bodywork service →",
  },
  {
    number: "03",
    category: "Diagnostics",
    title: "Computer Diagnostics",
    image: "/images/diagnostics-cluster.jpg",
    summary: "Diagnostic equipment and vehicle fault-finding work at Monos.",
    work: ["Computer diagnostics", "Fault finding", "Vehicle system checks"],
    service: "/services/computer-diagnostics",
    cta: "View diagnostics →",
  },
  {
    number: "04",
    category: "Fleet & Commercial",
    title: "Commercial Vehicle Support",
    image: "/images/fleet-truck.jpg",
    summary: "Workshop support for fleet and commercial vehicles.",
    work: ["Fleet support", "Commercial vehicles", "Workshop maintenance"],
    service: "/services/fleet-maintenance",
    cta: "View fleet service →",
  },
  {
    number: "05",
    category: "Fleet & Commercial",
    title: "Customer D-Max",
    image: "/images/customer-dmax.jpg",
    summary: "A customer D-Max photographed during workshop handling.",
    work: ["Vehicle inspection", "Workshop service", "Customer vehicle care"],
    service: "/services/car-workshop-mechanical-repairs",
    cta: "View mechanical service →",
  },
  {
    number: "06",
    category: "Workshop",
    title: "Inside the Monos Workshop",
    image: "/images/back-workshop.jpeg",
    summary: "A look inside the workshop where vehicles are inspected and repaired.",
    work: ["Vehicle inspection", "Mechanical work", "Workshop operations"],
    service: "/services/car-workshop-mechanical-repairs",
    cta: "View workshop service →",
  },
];

export default function WorkshopPortfolio() {
  return (
    <section id="work" className="section-pad border-y border-white/[0.08]">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end mb-14">
          <div>
            <div className="eyebrow">Selected Workshop Work</div>
            <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
              From the problem to the work completed.
            </h2>
          </div>
          <p className="text-silver max-w-[620px] lg:justify-self-end">
            Explore selected Monos workshop jobs through the photos we have on file. Each entry connects the work shown to the service that handles it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((item) => (
            <Reveal key={item.number}>
              <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src={item.image}
                    alt={`${item.title} — Monos VW-Audi Service & Parts`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/65 px-3 py-1 font-mono-tag text-[0.65rem] tracking-wider text-white">
                    {item.number} / {item.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-silver">{item.summary}</p>

                  <div className="mt-5">
                    <p className="font-mono-tag text-[0.62rem] uppercase tracking-[0.14em] text-silver-dim">Work shown</p>
                    <ul className="mt-3 grid gap-2 text-sm text-white">
                      {item.work.map((task) => <li key={task}>✓ {task}</li>)}
                    </ul>
                  </div>

                  <a href={item.service} className="mt-6 text-sm font-semibold text-white hover:text-red-400 transition-colors">
                    {item.cta}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div>
            <p className="font-semibold text-white">Have a vehicle that needs attention?</p>
            <p className="mt-1 text-sm text-silver">Send Monos the job details and we can assess the work required.</p>
          </div>
          <a href="#book" className="btn btn-ghost btn-sm">Book a service →</a>
        </div>
      </div>
    </section>
  );
}
