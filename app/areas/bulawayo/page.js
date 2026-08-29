const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

export const metadata = {
  title: "Car Repairs & VW Audi Specialists in Bulawayo",
  description: "Monos VW-Audi Service & Parts in Donnington, Bulawayo provides vehicle servicing, diagnostics, repairs, injector testing and cleaning, panel beating, spray painting and fleet maintenance.",
  keywords: ["car repairs Bulawayo", "VW specialist Bulawayo", "Audi specialist Bulawayo", "car service Bulawayo", "vehicle diagnostics Bulawayo", "panel beating Bulawayo"],
  alternates: { canonical: `${SITE_URL}/areas/bulawayo` },
};

const services = [
  ["VW & Audi servicing", "/services/vw-service-repairs"],
  ["Computer diagnostics", "/services/computer-diagnostics"],
  ["Fuel injector testing & cleaning", "/services/fuel-injector-testing-cleaning"],
  ["Panel beating & spray painting", "/services/panel-beating-spray-painting"],
  ["Fleet maintenance", "/services/fleet-maintenance"],
];

export default function BulawayoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Monos VW-Audi Service & Parts (Pvt) Ltd",
    url: SITE_URL,
    address: { "@type": "PostalAddress", streetAddress: "16 Ironbridge Road, Donnington", addressLocality: "Bulawayo", addressCountry: "ZW" },
    areaServed: { "@type": "City", name: "Bulawayo" },
  };

  return (
    <main className="min-h-screen bg-black text-offwhite">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Donnington · Bulawayo · Zimbabwe</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Car Repairs & VW-Audi Specialists in Bulawayo</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 opacity-80">Looking for a trusted workshop in Bulawayo? Monos VW-Audi Service & Parts provides servicing, diagnostics, mechanical repairs, injector testing and cleaning, body repairs and spray painting for VW, Audi and other vehicles.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://wa.me/263712579531?text=Hi%20Monos%2C%20I%20found%20you%20online%20and%20would%20like%20to%20book%20my%20vehicle." className="rounded-full bg-white px-6 py-3 font-semibold text-black">WhatsApp Monos</a>
          <a href="tel:+263712579531" className="rounded-full border border-white/20 px-6 py-3 font-semibold">Call +263 71 257 9531</a>
        </div>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Vehicle services in Bulawayo</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map(([label, href]) => <a key={href} href={href} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 font-semibold hover:bg-white/[0.06]">{label} →</a>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">Why drivers choose Monos</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div><h3 className="font-semibold">Accurate diagnosis</h3><p className="mt-2 opacity-70">Find the cause before replacing parts unnecessarily.</p></div>
          <div><h3 className="font-semibold">Broad capability</h3><p className="mt-2 opacity-70">Mechanical, electrical, diagnostics, bodywork and paint under one roof.</p></div>
          <div><h3 className="font-semibold">Convenient location</h3><p className="mt-2 opacity-70">Visit us at 16 Ironbridge Road, Donnington, Bulawayo.</p></div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">Need your vehicle checked?</h2>
          <p className="mt-4 max-w-2xl opacity-75">Tell us what your vehicle is doing, or bring it to the Monos workshop for assessment.</p>
          <a href="/" className="mt-7 inline-block font-semibold underline underline-offset-4">Book a service or request a quote →</a>
        </div>
      </section>
    </main>
  );
}
