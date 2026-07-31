const CLIENTS = [
  "Bulawayo City Council",
  "Econet Wireless",
  "Telecel",
  "C.I.H Industries (Pvt) Ltd",
  "Nkulumane High School",
  "Radar Metals",
  "Maco Builders",
  "Insurance & Mining Partners",
];

export default function Clients() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="max-w-[640px] mx-auto text-center mb-16">
          <div className="eyebrow center">Clients Who Trust Monos</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Corporate &amp; institutional partners
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-xl2 overflow-hidden">
          {CLIENTS.map((c) => (
            <div key={c} className="client-cell">{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
