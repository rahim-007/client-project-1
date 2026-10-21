import { motion } from 'framer-motion';

export function DesignPhilosophy() {
  return (
    <section
      id="approach"
      data-sc-act="editorial"
      className="py-28 sm:py-36 md:py-44 bg-[#FAF8F4] text-[#171715] relative overflow-hidden border-t border-[#B7AA97]/25"
      aria-label="Our Approach and Design Philosophy"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Eyebrow + Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#9C805B] block">
              OUR APPROACH
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#171715] leading-[1.06]">
              Good design is felt before it is noticed<span className="text-[#9C805B]">.</span>
            </h2>

            {/* Restrained animated line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-[1px] w-24 bg-[#9C805B] mt-8"
            />
          </motion.div>

          {/* Right Column: Refined Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8 lg:pt-4"
          >
            <p className="font-serif text-2xl sm:text-3xl text-[#171715] font-light leading-snug">
              We believe a home should feel effortless. True luxury is not an accumulation of ornament, but an orchestration of space, quiet, and daylight.
            </p>

            <div className="space-y-6 text-base sm:text-lg text-[#171715]/75 font-light leading-relaxed">
              <p>
                Thoughtful spatial planning and intuitive transitions allow daily routines to unfold with natural rhythm. By mapping how morning and evening sunlight wash across living areas, we carve spaces that evolve harmoniously from dawn to dusk.
              </p>
              <p>
                Every material is chosen for tactile resonance and longevity: seasoned natural timber that absorbs warmth, honed stone that stays cool underfoot, and unlacquered metals that develop a dignified patina with age. It is the calibration of proportion, light, and detail that yields interiors that balance architectural beauty with enduring everyday functionality.
              </p>
            </div>

            {/* Three architectural tenets */}
            <div className="pt-8 border-t border-[#B7AA97]/25 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#9C805B] block mb-1">
                  01 / SPATIAL FLOW
                </span>
                <p className="text-xs text-[#171715]/80 font-light">
                  Unobstructed sightlines and intuitive circulation tailored to personal living habits.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#9C805B] block mb-1">
                  02 / SENSORY LIGHT
                </span>
                <p className="text-xs text-[#171715]/80 font-light">
                  Diffused natural illumination paired with indirect 2700K circadian warm coves.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#9C805B] block mb-1">
                  03 / MATERIAL HONESTY
                </span>
                <p className="text-xs text-[#171715]/80 font-light">
                  Living timber, honest travertine stone, and unpretentious architectural joinery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
