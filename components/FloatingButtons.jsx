export default function FloatingButtons() {
  return (
    <>
      <a
        href="https://wa.me/263712579531"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-float"
      >
        <span className="ping" />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ position: "relative" }}>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39c1.44.78 3.06 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.93 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.4-.71-2.87-1.15-4.72-4.06-4.86-4.25-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.38c.26-.29.56-.36.75-.36.19 0 .38 0 .54.01.17.01.4-.06.63.48.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.14.14-.29.29-.13.57.17.29.75 1.23 1.6 2 1.1.98 2.03 1.29 2.32 1.43.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.67-.17 1.35z" />
        </svg>
      </a>
      <div className="emg-strip">
        <span className="dot2" />
        <span className="font-mono-tag text-[0.7rem] text-silver">
          EMERGENCY: <b className="text-white"><a href="tel:+263712579531">Call Breakdown Assist</a></b>
        </span>
      </div>
    </>
  );
}
