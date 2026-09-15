const SITE_URL = "https://www.monovwaudi.co.zw";

export const metadata = {
  title: "Car Overheating in Bulawayo | Monos",
  description: "Car overheating in Bulawayo? Monos checks cooling-system faults, diagnostics and related repairs for VW, Audi and other vehicles.",
  alternates: { canonical: `${SITE_URL}/problems/car-overheating-bulawayo` },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-offwhite">
      <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <p className="text-sm uppercase tracking-[0.2em] opacity-60">Monos · Bulawayo</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Car Overheating in Bulawayo?</h1>
        <p className="mt-6 text-lg leading-8 opacity-80">If your vehicle is overheating, do not keep driving and hope the problem clears. Repeated overheating can point to a cooling-system fault or another mechanical or electrical issue. Monos VW-Audi Service & Parts in Donnington can assess the vehicle and help identify the underlying cause.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="/services/computer-diagnostics" className="rounded-full bg-white px-6 py-3 font-semibold text-black">Book diagnostics →</a><a href="https://wa.me/263712579531?text=Hi%20Monos%2C%20my%20vehicle%20is%20overheating%20and%20I%27d%20like%20to%20book%20an%20assessment." className="rounded-full border border-white/20 px-6 py-3 font-semibold">WhatsApp Monos</a></div>
        <h2 className="mt-14 text-2xl font-bold">Signs your vehicle may be overheating</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 p-6">Temperature gauge running high or entering the red</div><div className="rounded-2xl border border-white/10 p-6">Coolant level dropping or visible coolant leaks</div><div className="rounded-2xl border border-white/10 p-6">Cooling fan not operating correctly</div><div className="rounded-2xl border border-white/10 p-6">Steam, unusual heat or a coolant smell</div><div className="rounded-2xl border border-white/10 p-6">Repeated overheating after previous repairs</div><div className="rounded-2xl border border-white/10 p-6">Warning lights or other engine symptoms alongside high temperature</div></div>
        <h2 className="mt-14 text-2xl font-bold">Common causes</h2>
        <p className="mt-4 leading-8 opacity-80">Overheating can be caused by coolant leaks, damaged hoses, radiator problems, a faulty thermostat, water-pump issues, cooling-fan faults, sensors or electrical problems. The correct repair depends on finding the cause rather than simply adding coolant.</p>
        <h2 className="mt-12 text-2xl font-bold">Diagnostics and repair in Bulawayo</h2>
        <p className="mt-4 leading-8 opacity-80">Monos can check the vehicle using computer diagnostics alongside practical inspection of the cooling system and related components. This is especially useful when overheating is intermittent or returns after another repair.</p>
        <p className="mt-5 leading-8 opacity-80">If the temperature is severely high, the vehicle is steaming, or the warning is persistent, stop safely and allow the engine to cool rather than continuing to drive it.</p>
        <p className="mt-12 opacity-70">Monos VW-Audi Service & Parts · 16 Ironbridge Road, Donnington, Bulawayo.</p>
      </section>
    </main>
  );
}
