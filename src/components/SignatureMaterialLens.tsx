import { useState, useRef, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Sparkle } from '@phosphor-icons/react';

interface MaterialPin {
  id: string;
  name: string;
  tag: string;
  x: number; // percentage from left
  y: number; // percentage from top
  spec: string;
  acoustic: string;
  provenance: string;
}

const MATERIAL_PINS: MaterialPin[] = [
  {
    id: 'teak',
    name: 'Seasoned Burma Teak',
    tag: 'TIMBER JOINERY · 01',
    x: 28,
    y: 52,
    spec: 'Quarter-sawn heartwood with breathable matte linseed oil seal',
    acoustic: 'NRC 0.35 Warm Reflection',
    provenance: 'FSC Certified Sustainable Seasoned Teak',
  },
  {
    id: 'travertine',
    name: 'Honed Roman Travertine',
    tag: 'STONE FLOORING · 02',
    x: 62,
    y: 78,
    spec: 'Continuous monolithic slabs with micro-beveled 1mm joints',
    acoustic: 'High thermal mass & natural density',
    provenance: 'Hand-selected cross-cut stone',
  },
  {
    id: 'lighting',
    name: '2700K Architectural Cove',
    tag: 'CIRCADIAN COVE · 03',
    x: 48,
    y: 22,
    spec: 'Indirect recessed linear cove illumination with 98 CRI fidelity',
    acoustic: 'Discreet zero-glare spatial wash',
    provenance: 'Custom calibrated architectural LED',
  },
  {
    id: 'glass',
    name: 'Fluted Acoustic Glazing',
    tag: 'SPATIAL SCREEN · 04',
    x: 78,
    y: 44,
    spec: 'Laminated sound-dampening acoustic interlayer with rhythmic reed flute',
    acoustic: 'STC 42 / Acoustic separation',
    provenance: 'Low-iron architectural clarity glass',
  },
];

export function SignatureMaterialLens() {
  const [activePin, setActivePin] = useState<MaterialPin>(MATERIAL_PINS[0]);
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 28, y: 52 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStageClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const yPct = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Find nearest pin or update lens position
    let nearest = MATERIAL_PINS[0];
    let minDistance = Infinity;

    MATERIAL_PINS.forEach((pin) => {
      const dist = Math.hypot(pin.x - xPct, pin.y - yPct);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = pin;
      }
    });

    setActivePin(nearest);
    setLensPos({ x: nearest.x, y: nearest.y });
  };

  const selectPin = (pin: MaterialPin) => {
    setActivePin(pin);
    setLensPos({ x: pin.x, y: pin.y });
  };

  return (
    <section
      data-sc-act="telemetry"
      className="py-24 sm:py-36 bg-[#171715] text-[#FAF8F4] relative overflow-hidden"
      aria-label="Architectural Material Telemetry Inspector"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkle size={14} className="text-[#9C805B]" weight="fill" />
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#9C805B]">
                SIGNATURE TOOL · MATERIAL LENS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#FAF8F4] leading-[1.08]">
              Tactile Material Anatomy<span className="text-[#9C805B]">.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#FAF8F4]/75 font-light leading-relaxed">
            Select an architectural datum below to inspect exact material specifications, sound dampening indices, and finish provenance.
          </p>
        </div>

        {/* Interactive Material Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Canvas Viewport */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onClick={handleStageClick}
              className="relative aspect-[16/10] w-full rounded-none overflow-hidden border border-white/15 cursor-crosshair bg-[#171715]/40 select-none group"
            >
              {/* Architectural Interior Study Frame */}
              <img
                src="/frames/frame-0110.jpg"
                alt="Architectural Material Study"
                className="w-full h-full object-cover opacity-85 transition-opacity duration-300 group-hover:opacity-95"
              />

              {/* Architectural Grid / Millimeter Ruler Overlays */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"
                aria-hidden="true"
              />

              {/* Corner Telemetry Tags */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-[#B7AA97] tracking-widest uppercase bg-[#171715]/80 px-2.5 py-1 border border-white/10">
                1:50 ATELIER SCALE
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#B7AA97] tracking-widest uppercase bg-[#171715]/80 px-2.5 py-1 border border-white/10">
                CHENNAI RESIDENCE · ATELIER STUDY
              </div>

              {/* Pins on the frame */}
              {MATERIAL_PINS.map((pin) => {
                const isSelected = activePin.id === pin.id;
                return (
                  <button
                    key={pin.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPin(pin);
                    }}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none transition-transform duration-300 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                    }`}
                    aria-label={`Inspect ${pin.name}`}
                  >
                    <span
                      className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                        isSelected
                          ? 'bg-[#9C805B] text-[#171715]'
                          : 'bg-[#171715]/80 text-[#FAF8F4] border border-white/30 hover:border-[#9C805B]'
                      }`}
                    >
                      <Crosshair size={14} weight="bold" />
                      {isSelected && (
                        <span className="absolute -inset-1 rounded-full border border-[#9C805B] animate-ping opacity-75" />
                      )}
                    </span>
                  </button>
                );
              })}

              {/* Floating Crosshair Indicator */}
              <motion.div
                animate={{ left: `${lensPos.x}%`, top: `${lensPos.y}%` }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 z-25"
              >
                <div className="w-16 h-16 rounded-full border border-[#9C805B]/60 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#9C805B]" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Live Telemetry Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 border border-white/15 bg-white/[0.03] space-y-6 backdrop-blur-sm">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#9C805B] block mb-2">
                  {activePin.tag}
                </span>
                <h3 className="font-serif text-3xl font-light text-[#FAF8F4]">
                  {activePin.name}
                </h3>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[#B7AA97] uppercase tracking-wider block mb-1">
                    SURFACE SPECIFICATION
                  </span>
                  <p className="text-[#FAF8F4]/90 font-sans text-sm font-light leading-relaxed">
                    {activePin.spec}
                  </p>
                </div>

                <div>
                  <span className="text-[#B7AA97] uppercase tracking-wider block mb-1">
                    ACOUSTIC BEHAVIOR
                  </span>
                  <p className="text-[#FAF8F4]/90 font-sans text-sm font-light">
                    {activePin.acoustic}
                  </p>
                </div>

                <div>
                  <span className="text-[#B7AA97] uppercase tracking-wider block mb-1">
                    PROVENANCE &amp; FINISH
                  </span>
                  <p className="text-[#FAF8F4]/90 font-sans text-sm font-light">
                    {activePin.provenance}
                  </p>
                </div>
              </div>

              {/* Pin Selection Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {MATERIAL_PINS.map((pin) => (
                  <button
                    key={pin.id}
                    onClick={() => selectPin(pin)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors border ${
                      activePin.id === pin.id
                        ? 'bg-[#9C805B] text-[#171715] border-[#9C805B] font-semibold'
                        : 'border-white/15 text-[#FAF8F4]/70 hover:border-white/40'
                    }`}
                  >
                    {pin.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
