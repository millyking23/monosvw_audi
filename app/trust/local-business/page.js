const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

export const metadata = {
  title: "About Monos VW-Audi Service & Parts in Bulawayo",
  description: "Learn about Monos VW-Audi Service & Parts in Donnington, Bulawayo, including its workshop location, services and local supplier registration record.",
  alternates: { canonical: `${SITE_URL}/trust/local-business` },
};

export default function LocalBusinessTrustPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Monos VW-Audi Service & Parts — Local Business Information",
    url: `${SITE_URL}/trust/local-business`,
    about: { "@type": "AutoRepair", name: "Monos VW-Audi Service & Parts (Pvt) Ltd", url: SITE_URL },
  };

  return (
    <main className="min-h-screen bg-black text-offwhite">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <p className="text-sm uppercase tracking-[0.2em] opacity-60">Monos · Donnington · Bulawayo</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">A local workshop built around real vehicle problems.</h1>
        <p className="mt-6 text-lg leading-8 opacity-80">Monos VW-Audi Service & Parts is a Bulawayo automotive workshop serving drivers with vehicle servicing, repairs, computer diagnostics, auto electrical work, fuel injector testing and cleaning, panel beating, spray painting, fleet maintenance and parts.</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-6"><h2 className="font-semibold">Workshop</h2><p className="mt-2 opacity-70">16 Iron Bridge Road, Donnington, Bulawayo, Zimbabwe.</p></div>
          <div className="rounded-2xl border border-white/10 p-6"><h2 className="font-semibold">Direct contact</h2><p className="mt-2 opacity-70">+263 71 257 9531</p><p className="opacity-70">monosvw_audiservice@yahoo.com</p></div>
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 p-7">
          <h2 className="text-2xl font-bold">Local business record</h2>
          <p className="mt-4 leading-7 opacity-75">Monos VW-Audi Service & Parts appears in Zimbabwe's electronic Government Procurement System as a local supplier in Bulawayo, with the registered address recorded as 16 Iron Bridge Road, Donnington, Bulawayo.</p>
          <a className="mt-5 inline-block font-semibold underline underline-offset-4" href="https://egp.praz.org.zw/">View Zimbabwe eGP →</a>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">What we help with</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["VW servicing & repairs", "Audi servicing & repairs", "Computer diagnostics", "Auto electrical work", "Fuel injector testing & cleaning", "Panel beating & spray painting", "Fleet maintenance", "Vehicle parts"].map((item) => <div key={item} className="rounded-xl border border-white/10 p-4 opacity-85">{item}</div>)}
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-3">
          <a href="/" className="rounded-full bg-white px-6 py-3 font-semibold text-black">Back to Monos →</a>
          <a href="https://wa.me/263712579531?text=Hi%20Monos%2C%20I%20found%20your%20website%20and%20would%20like%20to%20make%20an%20enquiry." className="rounded-full border border-white/20 px-6 py-3 font-semibold">WhatsApp us</a>
        </div>
      </section>
    </main>
  );
}
