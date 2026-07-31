"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#fleet", label: "Corporate Fleet" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="site-header"
      style={{ background: scrolled ? "rgba(11,11,11,.82)" : undefined }}
    >
      <nav className="max-w-wrap mx-auto px-8 py-3.5 flex items-center justify-between">
        <a href="#top" className="logo-wrap flex items-center gap-3">
          <div className="logo-mark">
            <Image src="/images/logo.jpg" alt="Monos logo" width={97} height={97} />
          </div>
          <div className="font-display font-semibold text-[0.98rem] leading-tight">
            MONOS
            <span className="block font-mono-tag text-[0.6rem] text-silver-dim tracking-[0.15em] mt-0.5">
              VW · AUDI SERVICE &amp; PARTS
            </span>
          </div>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-silver hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3.5">
          <a href="#quote" className="btn btn-ghost btn-sm hidden lg:inline-flex">
            Request Quote
          </a>
          <a href="#book" className="btn btn-primary btn-sm">
            Book Service
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-lg bg-white/5 flex flex-col items-center justify-center gap-1.5"
          >
            <span className="w-5 h-0.5 bg-white rounded" style={{ width: 18, height: 2 }} />
            <span className="w-5 h-0.5 bg-white rounded" style={{ width: 18, height: 2 }} />
            <span className="w-5 h-0.5 bg-white rounded" style={{ width: 18, height: 2 }} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bottom-0 bg-black px-8 py-10 flex flex-col gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-lg text-silver hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a href="#quote" onClick={() => setOpen(false)} className="btn btn-ghost mt-4">
            Request Quote
          </a>
        </div>
      )}
    </header>
  );
}
