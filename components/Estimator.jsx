"use client";

import { useState } from "react";

const SERVICE_TYPES = ["Full Service", "Diagnostics", "Brake Service", "Panel & Paint", "Other Repair"];
const VEHICLE_CLASSES = ["Sedan / Hatchback", "SUV / Crossover", "Commercial / Truck"];

export default function Estimator() {
  const [svcType, setSvcType] = useState(0);
  const [vehClass, setVehClass] = useState(0);
  const [age, setAge] = useState(5);

  const quoteMessage = encodeURIComponent(
    `Hello Monos, I would like a quote for ${SERVICE_TYPES[svcType]}. Vehicle: ${VEHICLE_CLASSES[vehClass]}. Approximate vehicle age: ${age} years. Please advise on inspection and pricing.`
  );

  return (
    <section className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap">
        <div className="max-w-[640px] mb-14">
          <div className="eyebrow">Quote Planner</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Plan your service request
          </h2>
          <p className="mt-4 text-silver">
            Choose the service and vehicle details below, then send them to Monos for an accurate quotation after inspection.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mb-7">
              <label className="flex justify-between font-mono-tag text-[0.72rem] tracking-wider uppercase text-silver-dim mb-2.5">
                <span>Service Type</span><span>{SERVICE_TYPES[svcType]}</span>
              </label>
              <input aria-label="Service type" type="range" min={0} max={SERVICE_TYPES.length - 1} step={1} value={svcType} onChange={(e) => setSvcType(+e.target.value)} />
            </div>
            <div className="mb-7">
              <label className="flex justify-between font-mono-tag text-[0.72rem] tracking-wider uppercase text-silver-dim mb-2.5">
                <span>Vehicle Class</span><span>{VEHICLE_CLASSES[vehClass]}</span>
              </label>
              <input aria-label="Vehicle class" type="range" min={0} max={VEHICLE_CLASSES.length - 1} step={1} value={vehClass} onChange={(e) => setVehClass(+e.target.value)} />
            </div>
            <div className="mb-7">
              <label className="flex justify-between font-mono-tag text-[0.72rem] tracking-wider uppercase text-silver-dim mb-2.5">
                <span>Vehicle Age (years)</span><span>{age}</span>
              </label>
              <input aria-label="Vehicle age" type="range" min={0} max={20} step={1} value={age} onChange={(e) => setAge(+e.target.value)} />
            </div>
          </div>
          <div className="estimate-result">
            <p className="font-mono-tag text-sm text-silver-dim">NEXT STEP</p>
            <h3 className="font-display font-bold text-3xl text-white my-2.5">Get an accurate quote</h3>
            <p className="text-silver-dim text-sm mb-6">
              Monos can assess the vehicle and confirm the work, parts and labour required before giving you a quotation.
            </p>
            <a
              href={`https://wa.me/263712579531?text=${quoteMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-red px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Request quote on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
