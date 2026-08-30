const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

export const metadata = {
  title: "Panel Beating & Spray Painting in Bulawayo | Monos",
  description: "Panel beating, dent repairs, accident repairs and professional spray painting in Bulawayo. Monos handles vehicle bodywork and refinishing for all makes and models.",
  alternates: { canonical: `${SITE_URL}/services/panel-beating-spray-painting` },
};

export default function Page() {
  const jsonLd={"@context":"https://schema.org","@type":"Service","name":"Panel Beating & Spray Painting","provider":{"@type":"AutoRepair","name":"Monos VW-Audi Service & Parts (Pvt) Ltd","url":SITE_URL},"areaServed":{"@type":"City","name":"Bulawayo"},"serviceType":["Panel beating","Spray painting","Accident repairs","Dent repairs","Vehicle refinishing"]};
  return <main className="min-h-screen bg-black text-offwhite"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/><section className="mx-auto max-w-5xl px-6 py-20 sm:py-28"><p className="text-sm uppercase tracking-[0.2em] opacity-60">Monos · Bulawayo · All Makes</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Panel Beating & Spray Painting</h1><p className="mt-6 max-w-3xl text-lg leading-8 opacity-80">Accident damage, dents, scratched panels or paint that needs attention? Monos provides panel beating and spray painting for VW, Audi and other makes and models in Bulawayo.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://wa.me/263712579531?text=Hi%20Monos%2C%20I%27d%20like%20a%20panel%20beating%20or%20spray%20painting%20quote." className="rounded-full bg-white px-6 py-3 font-semibold text-black">WhatsApp for a Quote</a><a href="tel:+263712579531" className="rounded-full border border-white/20 px-6 py-3 font-semibold">Call +263 71 257 9531</a></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{["Panel beating","Spray painting","Accident repairs","Dent and body repairs","Chassis straightening","Vehicle refinishing"].map(x=><div key={x} className="rounded-2xl border border-white/10 p-6 font-semibold">{x}</div>)}</div><p className="mt-12 opacity-70">For an assessment or quote, visit Monos at 16 Iron Bridge Road, Donnington, Bulawayo.</p></section></main>;
}
