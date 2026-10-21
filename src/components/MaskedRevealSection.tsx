import { useState, useRef, useEffect, type MouseEvent, type TouchEvent } from 'react';
import { SlidersHorizontal, Eye, Sparkle, ArrowsLeftRight } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function MaskedRevealSection() {
  const [sliderPosition, setSliderPosition] = useState(52); // Percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRevealBoxRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // ScrollTrigger mask reveal on entry
  useEffect(() => {
    if (prefersReducedMotion || !imageRevealBoxRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRevealBoxRef.current,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          scale: 1.05,
          opacity: 0.4,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleMove = (clientX: number) => {
    if (!imageRevealBoxRef.current) return;
    const rect = imageRevealBoxRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section
      id="spatial-lens"
      ref={containerRef}
      data-sc-act="spatial-lens"
      className="pt-14 sm:pt-20 pb-24 sm:pb-32 bg-[#F3EFE8] text-[#171715] relative overflow-hidden border-t border-[#B7AA97]/25"
      aria-label="Spatial Transformation Lens"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16 border-b border-[#B7AA97]/25 pb-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9C805B] block mb-3">
              SPATIAL TRANSFORMATION LENS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#171715] leading-[1.08]">
              Architectural Metamorphosis<span className="text-[#9C805B]">.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#171715]/75 font-light leading-relaxed">
              Every renovation at S.M.S DECORS is an act of deliberate refinement.
              Drag the architectural divider to witness how raw structural frameworks are transformed into
              acoustically balanced, light-filled sanctuaries.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F4] border border-[#B7AA97]/30 text-xs font-mono uppercase tracking-widest text-[#9C805B] shadow-sm">
            <ArrowsLeftRight size={14} weight="bold" />
            <span>DRAG DIVIDER TO COMPARE</span>
          </div>
        </div>

        {/* Framing for the Masked Comparison */}
        <div className="p-2 sm:p-3 rounded-none bg-[#FAF8F4] border border-[#B7AA97]/30 shadow-xl">
          <div
            ref={imageRevealBoxRef}
            className="relative h-[420px] sm:h-[540px] md:h-[640px] w-full rounded-none overflow-hidden select-none cursor-ew-resize will-change-transform"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Before and after renovation comparison slider"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                setSliderPosition((prev) => Math.max(0, prev - 5));
              } else if (e.key === 'ArrowRight') {
                setSliderPosition((prev) => Math.min(100, prev + 5));
              }
            }}
          >
            {/* Background Image: AFTER (Supplied Architectural Frame 0050) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/frames/frame-0050.jpg"
                alt="Completed luxury interior execution by S.M.S DECORS"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-[#171715]/85 backdrop-blur-md text-[#FAF8F4] px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-lg">
                <Sparkle size={13} className="text-[#9C805B]" weight="fill" />
                <span>AFTER: TURNKEY REFINEMENT</span>
              </div>
            </div>

            {/* Foreground Clipped Image: BEFORE (Raw Framework) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-75"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              <img
                src="/frames/frame-0005.jpg"
                alt="Raw structural framework before renovation"
                className="w-full h-full object-cover object-center filter grayscale contrast-150 brightness-75 invert-[0.1]"
                loading="lazy"
              />
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-[#171715]/85 backdrop-blur-md text-[#FAF8F4] px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase flex items-center gap-2 shadow-lg">
                <Eye size={13} className="text-[#9C805B]" />
                <span>BEFORE: STRUCTURAL SHELL</span>
              </div>
            </div>

            {/* Architectural Sliding Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#FAF8F4] pointer-events-none shadow-[0_0_15px_rgba(0,0,0,0.6)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Circular Architectural Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#171715] border-2 border-[#FAF8F4] text-[#FAF8F4] flex items-center justify-center shadow-2xl">
                <SlidersHorizontal size={16} className="text-[#9C805B]" weight="bold" />
              </div>
            </div>

            {/* Bottom Floating Material Callouts */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
              <div className="bg-[#171715]/90 backdrop-blur-md text-[#FAF8F4] px-4 py-2 rounded-full text-xs font-light">
                <span className="text-[#9C805B] font-mono mr-2">SPEC:</span>
                <span>Honed Travertine · Burma Teak Joinery · 2700K Warm Coves</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-[#FAF8F4]/95 backdrop-blur-md text-[#171715] px-4 py-2 rounded-full text-xs font-mono tracking-wider">
                <span>EXECUTION: 10 WEEKS TURNKEY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
