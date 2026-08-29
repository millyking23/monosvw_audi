const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

const services = {
  "vw-service-repairs": {
    title: "VW Service & Repairs in Bulawayo",
    description: "Professional Volkswagen servicing and repairs in Bulawayo, Zimbabwe, with diagnostics, mechanical repairs and preventative maintenance.",
    intro: "Keep your Volkswagen reliable, efficient and road-ready with specialist servicing and repairs from Monos in Donnington, Bulawayo.",
    points: ["Routine servicing and maintenance", "Mechanical fault diagnosis and repairs", "Engine and cooling-system checks", "Brake, suspension and steering work", "Computer diagnostics and fault-code checks"],
    keywords: "VW service Bulawayo, Volkswagen mechanic Bulawayo, VW repairs Bulawayo"
  },
  "audi-service-repairs": {
    title: "Audi Service & Repairs in Bulawayo",
    description: "Audi servicing, diagnostics and repairs in Bulawayo, Zimbabwe, from Monos VW-Audi Service & Parts.",
    intro: "From routine maintenance to difficult faults, Monos helps Audi owners in Bulawayo diagnose problems accurately and repair them properly.",
    points: ["Audi servicing and preventative maintenance", "Computer diagnostics and fault finding", "Engine and drivetrain repairs", "Brake, suspension and steering work", "Electrical fault diagnosis"],
    keywords: "Audi service Bulawayo, Audi mechanic Bulawayo, Audi repairs Bulawayo"
  },
  "computer-diagnostics": {
    title: "Computer Diagnostics in Bulawayo",
    description: "Vehicle computer diagnostics and electronic fault finding in Bulawayo for VW, Audi and other vehicles.",
    intro: "Warning light on? Vehicle losing power? Don't guess. Monos uses computer diagnostics to help identify electronic and vehicle-system faults before repairs begin.",
    points: ["Engine warning-light diagnostics", "Electronic fault-code scanning", "Performance and drivability fault finding", "VW and Audi diagnostic support", "Diagnostic checks before major repairs"],
    keywords: "car diagnostics Bulawayo, VW diagnostics Bulawayo, Audi diagnostics Bulawayo"
  },
  "fuel-injector-testing-cleaning": {
    title: "Fuel Injector Testing & Cleaning in Bulawayo",
    description: "Fuel injector testing and cleaning in Bulawayo to help diagnose poor performance, rough running and fuel-delivery problems.",
    intro: "Dirty or poorly performing injectors can affect starting, fuel economy, idle quality and engine performance. Monos provides injector testing and cleaning to help restore proper fuel delivery.",
    points: ["Injector performance testing", "Fuel injector cleaning", "Before-and-after testing", "Diagnosis of fuel-delivery symptoms", "Support for petrol and diesel applications"],
    keywords: "fuel injector cleaning Bulawayo, injector testing Bulawayo, fuel system service Bulawayo"
  },
  "panel-beating-spray-painting": {
    title: "Panel Beating & Spray Painting in Bulawayo",
    description: "Panel beating and professional spray painting in Bulawayo for accident damage, body repairs and vehicle cosmetic restoration.",
    intro: "Accident damage or tired bodywork doesn't have to stay that way. Monos combines panel beating and spray painting to bring vehicles back to a clean, presentable finish.",
    points: ["Accident-damage repairs", "Panel straightening and replacement", "Bodywork preparation", "Professional spray painting", "Vehicle cosmetic restoration"],
    keywords: "panel beating Bulawayo, spray painting Bulawayo, car body repair Bulawayo"
  },
  "fleet-maintenance": {
    title: "Fleet Vehicle Maintenance in Bulawayo",
    description: "Fleet maintenance and vehicle servicing in Bulawayo to help businesses keep their vehicles reliable and productive.",
    intro: "Vehicle downtime costs businesses money. Monos provides practical servicing, diagnostics and repair support for fleets operating in and around Bulawayo.",
    points: ["Scheduled fleet servicing", "Preventative maintenance", "Diagnostics and fault finding", "Mechanical repairs", "Maintenance support for multiple vehicles"],
    keywords: "fleet maintenance Bulawayo, fleet servicing Zimbabwe, business vehicle maintenance Bulawayo"
  }
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
    keywords: [service.keywords, "Monos VW Audi", "Bulawayo Zimbabwe"],
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: { title: service.title, description: service.description, url: `${SITE_URL}/services/${slug}`, type: "website" }
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "AutoRepair", name: "Monos VW-Audi Service & Parts (Pvt) Ltd", url: SITE_URL, address: { "@type": "PostalAddress", streetAddress: "16 Ironbridge Road, Donnington", addressLocality: "Bulawayo", addressCountry: "ZW" } },
    areaServed: { "@type": "City", name: "Bulawayo" },
    url: `${SITE_URL}/services/${slug}`
  };

  return (
    <main className="min-h-screen bg-black text-offwhite">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <a href="/" className="text-sm font-medium opacity-70 hover:opacity-100">← Monos VW-Audi Service & Parts</a>
        <div className="mt-10 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Bulawayo, Zimbabwe</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 opacity-80">{service.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="https://wa.me/263712579531?text=Hi%20Monos%2C%20I%27d%20like%20to%20enquire%20about%20your%20service." className="rounded-full bg-white px-6 py-3 font-semibold text-black">WhatsApp Monos</a>
            <a href="tel:+263712579531" className="rounded-full border border-white/20 px-6 py-3 font-semibold">Call Monos</a>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">What we can help with</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.points.map((point) => <div key={point} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">{point}</div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">Visit Monos in Donnington</h2>
        <p className="mt-4 max-w-2xl leading-7 opacity-75">Monos VW-Audi Service & Parts is based at 16 Ironbridge Road, Donnington, Bulawayo. We service and repair VW, Audi and other vehicles.</p>
        <a href="/" className="mt-7 inline-block font-semibold underline underline-offset-4">See all Monos services →</a>
      </section>
    </main>
  );
}
