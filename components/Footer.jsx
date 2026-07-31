import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal-2 border-t border-white/[0.08] pt-20 pb-8">
      <div className="wrap">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="footer-logo mb-5">
              <Image src="/images/logo-lockup.jpg" alt="Monos VW-Audi Service & Parts logo" width={190} height={64} style={{ height: 54, width: "auto" }} />
            </div>
            <p className="text-silver text-sm leading-relaxed max-w-[32ch]">
              Premium automotive engineering for every make and model, based in Bulawayo, Zimbabwe. Est. 2016.
            </p>
            <div className="social-row flex gap-3 mt-5">
              <a href="#" aria-label="Facebook">f</a>
              <a href="https://wa.me/263712579531" aria-label="WhatsApp">&#128172;</a>
              <a href="#contact" aria-label="Location">&#128205;</a>
            </div>
          </div>
          <div>
            <h5 className="font-mono-tag text-[0.68rem] tracking-wider uppercase text-silver-dim mb-5">Quick Links</h5>
            <ul className="flex flex-col gap-3">
              <li><a href="#about" className="text-sm text-silver hover:text-white">About</a></li>
              <li><a href="#services" className="text-sm text-silver hover:text-white">Services</a></li>
              <li><a href="#fleet" className="text-sm text-silver hover:text-white">Corporate Fleet</a></li>
              <li><a href="#gallery" className="text-sm text-silver hover:text-white">Gallery</a></li>
              <li><a href="#contact" className="text-sm text-silver hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono-tag text-[0.68rem] tracking-wider uppercase text-silver-dim mb-5">Company</h5>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-sm text-silver hover:text-white">Careers</a></li>
              <li><a href="#" className="text-sm text-silver hover:text-white">Company Profile (PDF)</a></li>
              <li><a href="#" className="text-sm text-silver hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-silver hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono-tag text-[0.68rem] tracking-wider uppercase text-silver-dim mb-5">Get In Touch</h5>
            <ul className="flex flex-col gap-3">
              <li><a href="tel:+263712579531" className="text-sm text-silver hover:text-white">+263 71 257 9531</a></li>
              <li><a href="mailto:monosvw_audiservice@yahoo.com" className="text-sm text-silver hover:text-white">monosvw_audiservice@yahoo.com</a></li>
              <li><a href="#contact" className="text-sm text-silver hover:text-white">16 Ironbridge Road, Bulawayo</a></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-3.5 mt-16 pt-6 border-t border-white/[0.08]">
          <p className="text-[0.78rem] text-silver-dim">
            &copy; {year} Monos VW-Audi Service &amp; Parts (Pvt) Ltd. All rights reserved.
          </p>
          <p className="text-[0.78rem] text-silver-dim">Engineering Confidence. Driving Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
