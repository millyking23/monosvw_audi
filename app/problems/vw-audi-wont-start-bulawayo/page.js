const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

export const metadata = {
  title: "VW or Audi Won't Start? Diagnostics in Bulawayo",
  description: "VW or Audi won't start in Bulawayo? Monos provides computer diagnostics and vehicle fault finding in Donnington to identify starting and electrical problems.",
  alternates: { canonical: `${SITE_URL}/problems/vw-audi-wont-start-bulawayo` },
};

export default function Page() {
  return <main className="min-h-screen bg-black text-offwhite"><section className="mx-auto max-w-4xl px-6 py-20 sm:py-28"><p className="text-sm uppercase tracking-[0.2em] opacity-60">Monos · Bulawayo</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">VW or Audi Won't Start?</h1><p className="mt-6 text-lg leading-8 opacity-80">If your VW or Audi is cranking but not starting, starting intermittently, or showing warning lights, accurate diagnostics can save time and prevent unnecessary parts replacement.</p><div className="mt-8 flex flex-wrap gap-3"><a href="/services/computer-diagnostics" className="rounded-full bg-white px-6 py-3 font-semibold text-black">Diagnostics service →</a><a href="https://wa.me/263712579531?text=Hi%20Monos%2C%20my%20VW%20or%20Audi%20won%27t%20start%20and%20I%27d%20like%20help." className="rounded-full border border-white/20 px-6 py-3 font-semibold">WhatsApp Monos</a></div><div className="mt-14 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 p-6">Engine warning light or fault codes</div><div className="rounded-2xl border border-white/10 p-6">Cranks but won't start</div><div className="rounded-2xl border border-white/10 p-6">Intermittent starting problems</div><div className="rounded-2xl border border-white/10 p-6">Electrical or sensor-related faults</div></div><p className="mt-12 opacity-70">Monos VW-Audi Service & Parts is at 16 Ironbridge Road, Donnington, Bulawayo.</p></section></main>;
}
