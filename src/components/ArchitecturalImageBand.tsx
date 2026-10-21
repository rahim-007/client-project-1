import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export function ArchitecturalImageBand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Slow subtle parallax translation
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-40, 40]
  );

  return (
    <section
      ref={containerRef}
      data-sc-act="parallax"
      className="relative w-full py-28 sm:py-36 md:py-48 overflow-hidden bg-[#171715] text-[#FAF8F4]"
      aria-label="Architectural Atmosphere"
    >
      {/* Full-width Parallax Background Frame */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
          <img
            src="/frames/frame-0185.jpg"
            alt="S.M.S DECORS Luxury Interior Architectural Sequence"
            className="w-full h-full object-cover opacity-75"
            loading="lazy"
          />
        </motion.div>
        {/* Subtle Darkening Vignette for Supreme Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#171715] via-[#171715]/40 to-[#171715]"
          aria-hidden="true"
        />
      </div>

      {/* Foreground Editorial Caption & Headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-16 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#B7AA97]">
            ARCHITECTURAL CONTINUITY
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#FAF8F4] leading-[1.05]">
            Made for living. Designed to last<span className="text-[#9C805B]">.</span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-[#FAF8F4]/80 font-light max-w-lg mx-auto leading-relaxed">
            Every vista is anchored by continuous materials and intentional geometry, forming spaces that remain tranquil through generations of living.
          </p>

          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-[#9C805B] pt-4">
            ATELIER S.M.S DECORS · CHENNAI
          </span>
        </motion.div>
      </div>
    </section>
  );
}
