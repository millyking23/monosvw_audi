const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://monovwaudi.co.zw";

export const metadata = {
  title: "Car Overheating in Bulawayo? Get It Checked",
  description: "Car overheating in Bulawayo? Monos in Donnington provides vehicle diagnostics, cooling-system checks and repairs for overheating problems.",
  alternates: { canonical: `${SITE_URL}/problems/car-overheating-bulawayo` },
};

export default function Page() {
  return <main className="min-h-screen bg-black text-offwhite"><section className="mx-auto max-w-4xl px-6 py-20 sm:py-28"><p className="text-sm uppercase tracking-[0.2em] opacity-60">Monos · Bulawayo</p><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Car Overheating in Bulawayo?</h1><p className="mt-6 text-lg leading-8 opacity-80">Repeated overheating should not be ignored. Monos can assess cooling-system faults and related mechanical or electronic problems so you can address the cause rather than keep topping up and guessing.</p><div className="mt-8 flex flex-wrap gap-3"><a href="/services/computer-diagnostics" className="rounded-full bg-white px-6 py-3 font-semibold text-black">Book diagnostics →</a><a href="https://wa.me/263712579531?text=Hi%20Monos%2C%20my%20vehicle%20is%20overheating%20and%20I%27d%20like%20to%20book%20an%20assessment." className="rounded-full border border-white/20 px-6 py-3 font-semibold">WhatsApp Monos</a></div><div className="mt-14 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 p-6">Temperature gauge running high</div><div className="rounded-2xl border border-white/10 p-6">Coolant loss or leaks</div><div className="rounded-2xl border border-white/10 p-6">Cooling fan problems</div><div className="rounded-2xl border border-white/10 p-6">Recurring overheating after repairs</div></div><p className="mt-12 opacity-70">Monos VW-Audi Service & Parts is at 16 Ironbridge Road, Donnington, Bulawayo.</p></section></main>;
}
