export default function CTAStrip() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="cta-strip">
          <div className="eyebrow center relative z-10">Ready When You Are</div>
          <h2 className="font-display font-semibold text-white relative z-10" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
            Bring your vehicle to a team that treats it like their own
          </h2>
          <p className="mt-4 text-silver relative z-10">
            Book online, request a quote, or reach us directly on WhatsApp.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-9 relative z-10">
            <a href="#book" className="btn btn-primary">Book Service</a>
            <a href="tel:+263712579531" className="btn btn-ghost">Call The Workshop</a>
          </div>
        </div>
      </div>
    </section>
  );
}
