const POSTS = [
  { thumb: "ENGINE DIAGNOSTICS", tag: "Diagnostics", title: "Why your check-engine light isn't always an emergency", text: "How to read the difference between a minor sensor fault and a serious ECU issue." },
  { thumb: "BRAKE CARE", tag: "Safety", title: "Brake pad life in Zimbabwe's road conditions", text: "What affects wear rate locally, and the warning signs not to ignore." },
  { thumb: "FLEET UPKEEP", tag: "Fleet", title: "Building a preventative maintenance schedule", text: "A simple framework fleet managers can use to cut unplanned downtime." },
];

export default function Blog() {
  return (
    <section id="blog" className="section-pad">
      <div className="wrap">
        <div className="max-w-[640px] mb-14">
          <div className="eyebrow">From The Workshop</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Maintenance tips
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <div key={p.title} className="blog-card">
              <div className="blog-thumb">{p.thumb}</div>
              <div className="p-6">
                <div className="font-mono-tag text-[0.66rem] text-red tracking-wider uppercase">{p.tag}</div>
                <h4 className="mt-2.5 text-white font-display font-semibold">{p.title}</h4>
                <p className="mt-2 text-silver text-sm">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
