import BeforeAfter from "@/components/BeforeAfter";

const SITE_URL = "https://www.monovwaudi.co.zw";

const services = {
  "car-workshop-mechanical-repairs": {
    title: "Car Mechanic & Vehicle Repairs in Bulawayo",
    description: "Car mechanic and vehicle repair services in Bulawayo, Zimbabwe, including servicing, mechanical repairs, diagnostics, brakes, cooling systems and general fault finding.",
    intro: "Need a reliable mechanic in Bulawayo? Monos provides vehicle servicing, mechanical repairs, diagnostics and practical fault finding for VW, Audi and other vehicles.",
    points: ["Routine vehicle servicing and maintenance", "Mechanical fault diagnosis and repairs", "Brake, suspension and steering work", "Engine and cooling-system checks", "Starting, running and performance problems", "Computer diagnostics and fault-code checks"],
    keywords: "mechanic Bulawayo, car mechanic Bulawayo, car repairs Bulawayo, vehicle repairs Bulawayo",
    body: "Our workshop handles routine maintenance as well as mechanical fault finding when a vehicle develops a starting, running, braking, suspension, cooling or performance problem. We can combine computer diagnostics with hands-on mechanical inspection so the repair is based on the symptoms and test results rather than guesswork."
  },
  "vw-service-repairs": {
    title: "VW Service & Repairs in Bulawayo",
    description: "Professional Volkswagen servicing and repairs in Bulawayo, Zimbabwe, with diagnostics, mechanical repairs and preventative maintenance.",
    intro: "Keep your Volkswagen reliable, efficient and road-ready with specialist servicing and repairs from Monos in Donnington, Bulawayo.",
    points: ["Routine servicing and maintenance", "Mechanical fault diagnosis and repairs", "Engine and cooling-system checks", "Brake, suspension and steering work", "Computer diagnostics and fault-code checks"],
    keywords: "VW service Bulawayo, Volkswagen mechanic Bulawayo, VW repairs Bulawayo",
    body: "Monos specialises in Volkswagen servicing and repairs, from routine maintenance to diagnosing difficult running faults. Our VW service work can include mechanical inspection, computer diagnostics, brakes, suspension, cooling systems and general repair work."
  },
  "audi-service-repairs": {
    title: "Audi Service & Repairs in Bulawayo",
    description: "Audi servicing, diagnostics and repairs in Bulawayo, Zimbabwe, from Monos VW-Audi Service & Parts.",
    intro: "From routine maintenance to difficult faults, Monos helps Audi owners in Bulawayo diagnose problems accurately and repair them properly.",
    points: ["Audi servicing and preventative maintenance", "Computer diagnostics and fault finding", "Engine and drivetrain repairs", "Brake, suspension and steering work", "Electrical fault diagnosis"],
    keywords: "Audi service Bulawayo, Audi mechanic Bulawayo, Audi repairs Bulawayo",
    body: "Audi vehicles often benefit from systematic diagnostics before parts are replaced. Monos combines computer fault-code checks with mechanical and electrical inspection for Audi servicing and repairs, covering routine maintenance, performance problems, braking, suspension and drivetrain concerns."
  },
  "computer-diagnostics": {
    title: "Computer Diagnostics in Bulawayo",
    description: "Vehicle computer diagnostics and electronic fault finding in Bulawayo for VW, Audi and other vehicles.",
    intro: "Warning light on? Vehicle losing power? Don't guess. Monos uses computer diagnostics to help identify electronic and vehicle-system faults before repairs begin.",
    points: ["Engine warning-light diagnostics", "Electronic fault-code scanning", "Performance and drivability fault finding", "VW and Audi diagnostic support", "Diagnostic checks before major repairs"],
    keywords: "car diagnostics Bulawayo, VW diagnostics Bulawayo, Audi diagnostics Bulawayo",
    body: "Computer diagnostics can help narrow down faults behind warning lights, poor performance, starting problems and other electronic symptoms. Monos uses diagnostic checks alongside physical inspection and testing to help identify the system that needs attention before mechanical work begins."
  },
  "fuel-injector-testing-cleaning": {
    title: "Fuel Injector Testing & Cleaning in Bulawayo",
    description: "Fuel injector testing and cleaning in Bulawayo to help diagnose poor performance, rough running and fuel-delivery problems.",
    intro: "Dirty or poorly performing injectors can affect starting, fuel economy, idle quality and engine performance. Monos provides injector testing and cleaning to help restore proper fuel delivery.",
    points: ["Injector performance testing", "Fuel injector cleaning", "Before-and-after testing", "Diagnosis of fuel-delivery symptoms", "Support for petrol and diesel applications"],
    keywords: "fuel injector cleaning Bulawayo, injector testing Bulawayo, fuel system service Bulawayo",
    body: "Injector problems can show up as rough running, poor starting, reduced performance or fuel-delivery symptoms. Monos provides injector testing and cleaning so injector condition can be assessed and the fuel system can be serviced as part of a wider diagnostic process."
  },
  "panel-beating-spray-painting": {
    title: "Panel Beating & Spray Painting in Bulawayo",
    description: "Panel beating and professional spray painting in Bulawayo for accident damage, body repairs and vehicle cosmetic restoration.",
    intro: "Accident damage or tired bodywork doesn't have to stay that way. Monos combines panel beating and spray painting to bring vehicles back to a clean, presentable finish.",
    points: ["Accident-damage repairs", "Panel straightening and replacement", "Bodywork preparation", "Professional spray painting", "Vehicle cosmetic restoration"],
    keywords: "panel beating Bulawayo, spray painting Bulawayo, car body repair Bulawayo",
    body: "Monos handles vehicle body repairs from damaged panels through preparation and spray painting. Where appropriate, the work can include straightening or replacing damaged panels, preparing repaired areas and finishing the vehicle so the repaired bodywork is clean and presentable."
  },
  "fleet-maintenance": {
    title: "Fleet Vehicle Maintenance in Bulawayo",
    description: "Fleet maintenance and vehicle servicing in Bulawayo to help businesses keep their vehicles reliable and productive.",
    intro: "Vehicle downtime costs businesses money. Monos provides practical servicing, diagnostics and repair support for fleets operating in and around Bulawayo.",
    points: ["Scheduled fleet servicing", "Preventative maintenance", "Diagnostics and fault finding", "Mechanical repairs", "Maintenance support for multiple vehicles"],
    keywords: "fleet maintenance Bulawayo, fleet servicing Zimbabwe, business vehicle maintenance Bulawayo",
    body: "Monos can support businesses that need servicing, diagnostics and mechanical repairs across multiple vehicles. Regular maintenance and timely fault finding can help identify problems before they become larger repair issues and reduce avoidable vehicle downtime."
  }
};

const relatedServices = [
  ["car-workshop-mechanical-repairs", "Car Mechanic & Vehicle Repairs"],
  ["vw-service-repairs", "VW Service & Repairs"],
  ["audi-service-repairs", "Audi Service & Repairs"],
  ["computer-diagnostics", "Computer Diagnostics"],
  ["fuel-injector-testing-cleaning", "Fuel Injector Testing & Cleaning"],
  ["panel-beating-spray-painting", "Panel Beating & Spray Painting"],
  ["fleet-maintenance", "Fleet Vehicle Maintenance"]
];

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
          <div className="mt-8 max-w-3xl space-y-4 text-base leading-7 opacity-75">
            <p>{service.body}</p>
            <p>Based in Donnington, Bulawayo, Monos provides VW and Audi specialist support alongside general vehicle servicing, diagnostics, mechanical repairs, panel beating, spray painting, injector testing and parts supply.</p>
          </div>
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

      {slug === "panel-beating-spray-painting" && <BeforeAfter />}

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Related Monos services</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.filter(([serviceSlug]) => serviceSlug !== slug).map(([serviceSlug, label]) => (
              <a key={serviceSlug} href={`/services/${serviceSlug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-semibold transition hover:bg-white/[0.07]">
                {label} →
              </a>
            ))}
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
