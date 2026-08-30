const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

export const metadata = {
  title: "Auto Advice | Car Problems, Repairs & Maintenance in Bulawayo",
  description: "Practical vehicle advice from Monos in Bulawayo covering car repairs, diagnostics, overheating, starting faults, brakes, injectors, bodywork, spray painting and maintenance.",
  alternates: { canonical: `${SITE_URL}/auto-advice` },
};

const articles = [
  ["VW or Audi won't start", "/problems/vw-audi-wont-start-bulawayo", "Common starting symptoms and why proper diagnostics matters."],
  ["Car overheating", "/problems/car-overheating-bulawayo", "Warning signs of cooling-system and related faults."],
  ["Check-engine light", "/problems/check-engine-light-bulawayo", "What a warning light can mean and when to get a diagnostic scan."],
  ["Car losing power", "/problems/car-losing-power-bulawayo", "Common causes of hesitation, poor acceleration and reduced performance."],
  ["Fuel injector problems", "/problems/fuel-injector-problems-bulawayo", "Symptoms of injector and fuel-delivery problems and when testing helps."],
  ["Rough engine idle", "/problems/rough-idle-bulawayo", "Why an engine may shake, hunt or idle unevenly."],
  ["Brake problems", "/problems/brake-problems-bulawayo", "Noise, vibration, pulling and soft-pedal symptoms that need attention."],
  ["Computer diagnostics", "/services/computer-diagnostics", "When a diagnostic scan can help find the cause of a vehicle fault."],
  ["Fuel injector testing & cleaning", "/services/fuel-injector-testing-cleaning", "How testing and cleaning can help investigate fuel-delivery issues."],
  ["VW & Audi servicing", "/services/vw-service-repairs", "Why regular servicing helps catch problems before they become expensive."],
  ["Car workshop & mechanical repairs", "/services/car-workshop-mechanical-repairs", "Workshop services for VW, Audi and other makes and models."],
  ["Panel beating & spray painting", "/services/panel-beating-spray-painting", "Accident repairs, dents, bodywork and spray painting for all makes."],
];

export default function Page() {
  const jsonLd = { "@context":"https://schema.org", "@type":"CollectionPage", name:"Monos Auto Advice", url:`${SITE_URL}/auto-advice`, description:metadata.description };
  return <main className="min-h-screen bg-black text-offwhite"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/><section className="mx-auto max-w-5xl px-6 py-20 sm:py-28"><p className="text-sm uppercase tracking-[0.2em] opacity-60">Monos · Bulawayo · All Makes</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Auto Advice</h1><p className="mt-6 max-w-3xl text-lg leading-8 opacity-80">Useful information for drivers dealing with warning lights, starting faults, overheating, braking issues, injector symptoms, body damage and routine maintenance. Monos works on VW, Audi and other makes and models in Donnington, Bulawayo.</p><div className="mt-10 grid gap-5 sm:grid-cols-2">{articles.map(([title,href,text])=><a href={href} key={href} className="rounded-2xl border border-white/10 p-6 transition hover:bg-white/[0.05]"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-2 opacity-70">{text}</p><span className="mt-5 inline-block font-semibold">Read more →</span></a>)}</div><div className="mt-14 rounded-2xl border border-white/10 p-7"><h2 className="text-2xl font-bold">Need help with your vehicle?</h2><p className="mt-3 opacity-70">Monos VW-Audi Service & Parts, 16 Ironbridge Road, Donnington, Bulawayo.</p><div className="mt-6 flex flex-wrap gap-3"><a href="https://wa.me/263712579531?text=Hi%20Monos%2C%20I%27d%20like%20help%20with%20my%20vehicle." className="rounded-full bg-white px-6 py-3 font-semibold text-black">WhatsApp Monos</a><a href="tel:+263712579531" className="rounded-full border border-white/20 px-6 py-3 font-semibold">Call Monos</a></div></div></section></main>;
}
