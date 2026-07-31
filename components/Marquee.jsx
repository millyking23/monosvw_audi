const BRANDS = [
  "Volkswagen", "Audi", "BMW", "Mercedes-Benz", "Toyota", "Ford",
  "Nissan", "Mazda", "Isuzu", "Hyundai", "Kia", "Land Rover",
];

export default function Marquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <div className="border-y border-white/[0.08] py-9 overflow-hidden bg-charcoal-2">
      <div className="eyebrow max-w-wrap mx-auto px-8 mb-5">All Makes &amp; Models</div>
      <div className="marquee-track">
        {row.map((b, i) => (
          <span
            key={i}
            className="font-display font-semibold text-[1.4rem] text-silver-dim tracking-wide whitespace-nowrap"
          >
            {["Volkswagen", "Audi"].includes(b) ? <b className="text-white">{b}</b> : b}
          </span>
        ))}
      </div>
    </div>
  );
}
