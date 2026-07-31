"use client";

import { useMemo, useState } from "react";

const SERVICE_TYPES = ["Full Service", "Diagnostics Scan", "Brake Service", "Panel & Paint"];
const SERVICE_BASE = [[70, 110], [25, 45], [60, 100], [250, 600]];
const VEHICLE_CLASSES = ["Sedan / Hatchback", "SUV / Crossover", "Commercial / Truck"];
const VEHICLE_MULT = [1, 1.35, 1.8];

export default function Estimator() {
  const [svcType, setSvcType] = useState(0);
  const [vehClass, setVehClass] = useState(0);
  const [age, setAge] = useState(5);

  const { low, high } = useMemo(() => {
    const ageMult = 1 + (age / 20) * 0.4;
    const [lo, hi] = SERVICE_BASE[svcType];
    return {
      low: Math.round(lo * VEHICLE_MULT[vehClass] * ageMult),
      high: Math.round(hi * VEHICLE_MULT[vehClass] * ageMult),
    };
  }, [svcType, vehClass, age]);

  return (
    <section className="section-pad bg-charcoal-2 border-y border-white/[0.08]">
      <div className="wrap">
        <div className="max-w-[640px] mb-14">
          <div className="eyebrow">Ballpark Only</div>
          <h2 className="font-display font-semibold text-white" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
            Service cost estimator
          </h2>
          <p className="mt-4 text-silver">
            A rough indication to help you plan — your final quotation depends on inspection.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mb-7">
              <label className="flex justify-between font-mono-tag text-[0.72rem] tracking-wider uppercase text-silver-dim mb-2.5">
                <span>Service Type</span><span>{SERVICE_TYPES[svcType]}</span>
              </label>
              <input type="range" min={0} max={3} step={1} value={svcType} onChange={(e) => setSvcType(+e.target.value)} />
            </div>
            <div className="mb-7">
              <label className="flex justify-between font-mono-tag text-[0.72rem] tracking-wider uppercase text-silver-dim mb-2.5">
                <span>Vehicle Class</span><span>{VEHICLE_CLASSES[vehClass]}</span>
              </label>
              <input type="range" min={0} max={2} step={1} value={vehClass} onChange={(e) => setVehClass(+e.target.value)} />
            </div>
            <div className="mb-7">
              <label className="flex justify-between font-mono-tag text-[0.72rem] tracking-wider uppercase text-silver-dim mb-2.5">
                <span>Vehicle Age (years)</span><span>{age}</span>
              </label>
              <input type="range" min={0} max={20} step={1} value={age} onChange={(e) => setAge(+e.target.value)} />
            </div>
          </div>
          <div className="estimate-result">
            <p className="font-mono-tag text-sm text-silver-dim">ESTIMATED RANGE</p>
            <div className="font-display font-bold text-4xl text-white my-2.5">
              <span className="text-red">${low}</span> &ndash; <span className="text-red">${high}</span>
            </div>
            <p className="text-silver-dim text-sm">USD, parts &amp; labour, before inspection</p>
          </div>
        </div>
      </div>
    </section>
  );
}
