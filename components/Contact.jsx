export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap grid lg:grid-cols-2 gap-14">
        <div>
          <div className="eyebrow">Visit Or Call Us</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Contact
          </h2>
          <div className="flex flex-col gap-6 mt-7">
            <div className="flex gap-5">
              <div className="contact-icon">&#128205;</div>
              <div>
                <h4 className="text-white font-medium mb-1">Monos VW-Audi Service &amp; Parts (Pvt) Ltd</h4>
                <p className="text-silver text-sm">16 Ironbridge Road, Donnington, Bulawayo, Zimbabwe</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="contact-icon">&#128222;</div>
              <div>
                <h4 className="text-white font-medium mb-1">Phone</h4>
                <p className="text-silver text-sm">+263 71 257 9531</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="contact-icon">&#9993;</div>
              <div>
                <h4 className="text-white font-medium mb-1">Email</h4>
                <p className="text-silver text-sm">monosvw_audiservice@yahoo.com</p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="contact-icon">&#128172;</div>
              <div>
                <h4 className="text-white font-medium mb-1">WhatsApp</h4>
                <p className="text-silver text-sm">Instant support — tap the floating button anywhere on this site.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-sm">
            <div className="hours-row"><span>Monday &ndash; Friday</span><b className="text-white font-medium">07:30 &ndash; 17:30</b></div>
            <div className="hours-row"><span>Saturday</span><b className="text-white font-medium">08:00 &ndash; 13:00</b></div>
            <div className="hours-row"><span>Sunday</span><b className="text-white font-medium">Emergency breakdown only</b></div>
          </div>
        </div>
        <div>
          <div className="map-frame">
            <iframe
              loading="lazy"
              title="Monos VW-Audi Service & Parts location"
              src="https://maps.google.com/maps?q=16%20Ironbridge%20Road%2C%20Bulawayo%2C%20Zimbabwe&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
            />
          </div>
          <div className="field mt-5">
            <label>Newsletter &mdash; Maintenance Reminders &amp; Offers</label>
            <div className="flex gap-2.5">
              <input type="email" placeholder="you@email.com" />
              <button className="btn btn-primary btn-sm" type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
