import { useState } from 'react';
import { Compass, Hammer, Sparkle, Wall, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryStep {
  id: string;
  number: string;
  tag: string;
  title: string;
  narrative: string;
  image: string;
  caption: string;
  materials: string[];
  metrics: { label: string; value: string }[];
  icon: typeof Compass;
}

const STORY_STEPS: StoryStep[] = [
  {
    id: 'material-honesty',
    number: '01',
    tag: 'MATERIAL AUTHENTICITY',
    title: 'The Tactile Honesty of Living Materials',
    narrative:
      'We reject paper-thin faux finishes. Since our founding in 2015, S.M.S DECORS has championed authentic materials that age with dignity under Chennai’s climate: solid seasoned teak, honed Roman travertine, fluted glass, and hand-rubbed bronze reveals.',
    image: '/projects/residential/brick-console.png',
    caption: 'Real wirecut brick masonry accent wall with solid live-edge timber console',
    materials: ['Wirecut Terracotta Brick', 'Solid Hardwood Slab', 'Wrought Iron Supports', 'Polished Stone'],
    metrics: [
      { label: 'Surface Durability', value: '15+ Years' },
      { label: 'Thermal Absorption', value: 'Optimized' },
    ],
    icon: Wall,
  },
  {
    id: 'ergonomic-flow',
    number: '02',
    tag: 'SPATIAL ANATOMY',
    title: 'Calibrated Sightlines and Natural Illumination',
    narrative:
      'True luxury in interior architecture is effortless circulation. We systematically interrogate how light moves across a room throughout the day, sculpting ceiling coves and sightlines so spaces feel expansive, tranquil, and inherently intuitive.',
    image: '/projects/residential/timber-corridor.png',
    caption: 'Architectural corridor ceiling with continuous recessed transversal LED profiles',
    materials: ['Walnut Timber Coffering', 'Transverse LED Profiles', 'Perimeter Wall Wash', 'Low-VOC Matte Paint'],
    metrics: [
      { label: 'Daylight Optimization', value: 'Circadian' },
      { label: 'Circulation Efficiency', value: 'Intuitive' },
    ],
    icon: Compass,
  },
  {
    id: 'master-joinery',
    number: '03',
    tag: 'PRECISION MILLWORK',
    title: 'Artisanal Joinery & Bespoke Cabinetry',
    narrative:
      'Every credenza, wardrobe, and partition is drafted with half-millimeter precision. We combine precision joinery with traditional hand-finishing, utilizing seasoned hardwoods to withstand humidity while delivering silent soft-close actuation.',
    image: '/projects/residential/walnut-living.png',
    caption: 'Book-matched walnut veneer wall cladding with frameless glass curio display',
    materials: ['Book-Matched Walnut', 'Frameless Float Glass', 'Exposed Brick Accent', 'Italian Botticino Marble'],
    metrics: [
      { label: 'Joinery Tolerance', value: '±0.5 mm' },
      { label: 'Acoustic Rating', value: 'NRC 0.82' },
    ],
    icon: Hammer,
  },
  {
    id: 'turnkey-execution',
    number: '04',
    tag: 'PRACTICAL DELIVERY',
    title: 'Rigorous Turnkey Engineering & Site Mastery',
    narrative:
      'Architecture fails if execution falters. S.M.S DECORS retains dedicated on-site supervisors, rigorous MEP coordination, and strict milestone adherence. Clients receive transparent schedule reporting from initial concept to final white-glove handover.',
    image: '/projects/renovation/after.png',
    caption: 'Turnkey structural transformation with dual-tier false ceiling and LED coves',
    materials: ['Dedicated Site Supervision', 'Daily Milestone Tracking', 'Zero-Dust Clean Handover', 'Post-Handover Warranty'],
    metrics: [
      { label: 'Handover Precision', value: '100% On-Plan' },
      { label: 'Studio Heritage', value: 'Est. 2015' },
    ],
    icon: Sparkle,
  },
];

export function PinnedStorytelling() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = STORY_STEPS[activeStepIndex];
  const ActiveIcon = activeStep.icon;

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : STORY_STEPS.length - 1));
  };

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev < STORY_STEPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="anatomy"
      data-sc-act="pinned-story"
      className="py-20 sm:py-28 bg-[#171715] text-[#FAF8F4] relative border-t border-white/10"
      aria-label="Architectural Craft Dossier"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E5C384] block mb-3">
              CRAFT ARCHIVE · DISCIPLINE 0{activeStepIndex + 1} OF 04
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#FAF8F4] leading-[1.08]">
              The Anatomy of Enduring Architecture<span className="text-[#E5C384]">.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#FAF8F4]/90 font-light leading-relaxed">
              Witness how tactile honesty, spatial mathematics, and relentless on-site supervision merge into spaces
              that speak quietly of permanence.
            </p>
          </div>

          {/* Quick Step Switcher Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-[#FAF8F4] transition-colors"
              aria-label="Previous Craft Discipline"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="text-xs font-mono tracking-widest text-[#B7AA97]">
              <span>0{activeStepIndex + 1}</span>
              <span className="text-white/30 mx-1.5">/</span>
              <span>04</span>
            </div>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-[#FAF8F4] transition-colors"
              aria-label="Next Craft Discipline"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Interactive Discipline Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10">
          {STORY_STEPS.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-[#FAF8F4] text-[#171715] font-semibold shadow-lg'
                    : 'bg-white/5 hover:bg-white/15 text-[#FAF8F4]/70 border border-white/10'
                }`}
              >
                <span className={isCurrent ? 'text-[#E5C384]' : 'text-white/40'}>{step.number}</span>
                <span>{step.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Dual-Panel Integrated Architectural Console (Zero Unwanted Space) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch rounded-none border border-white/10 bg-white/[0.02] p-6 sm:p-10 backdrop-blur-sm">
          {/* Left Panel: High-Resolution Photographic Display */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[480px] overflow-hidden bg-[#0F0F0E] border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeStep.image}
                    alt={activeStep.caption}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171715]/90 via-transparent to-[#171715]/30" />

                  {/* Top Architectural Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-[#171715]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-widest text-[#B7AA97] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5C384] animate-pulse" />
                    <span>{activeStep.tag}</span>
                  </div>

                  {/* Floating Next/Prev on Image */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="w-8 h-8 rounded-full bg-[#171715]/80 hover:bg-[#171715] backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-colors"
                      title="Previous"
                    >
                      <ArrowLeft size={13} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-8 h-8 rounded-full bg-[#171715]/80 hover:bg-[#171715] backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-colors"
                      title="Next"
                    >
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <p className="text-xs sm:text-sm font-light text-[#FAF8F4]/90 leading-snug">
                      {activeStep.caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step Indicators Below Image */}
            <div className="flex items-center justify-between pt-4 text-xs font-mono text-[#FAF8F4]/50">
              <div className="flex items-center gap-1.5">
                {STORY_STEPS.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeStepIndex === idx ? 'w-8 bg-[#E5C384]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#B7AA97]">
                ATELIER STUDY ARCHIVE
              </span>
            </div>
          </div>

          {/* Right Panel: Technical Specifications & Craft Anatomy */}
          <div className="lg:col-span-6 flex flex-col justify-between pt-2 lg:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Discipline Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#E5C384]/15 text-[#E5C384] flex items-center justify-center border border-[#E5C384]/20">
                      <ActiveIcon size={18} weight="light" />
                    </div>
                    <span className="text-xs font-mono tracking-widest text-[#E5C384] uppercase">
                      {activeStep.tag}
                    </span>
                  </div>
                  <span className="text-3xl font-serif text-[#FAF8F4]/30 font-light">
                    {activeStep.number}
                  </span>
                </div>

                {/* Title & Narrative */}
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#FAF8F4] leading-snug">
                    {activeStep.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#FAF8F4]/90 font-light leading-relaxed">
                    {activeStep.narrative}
                  </p>
                </div>

                {/* Material Specification Chips */}
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#B7AA97] mb-3">
                    MATERIAL SPECIFICATIONS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeStep.materials.map((mat) => (
                      <span
                        key={mat}
                        className="px-3 py-1 text-[11px] font-mono text-[#FAF8F4]/85 bg-white/5 border border-white/10"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engineering Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  {activeStep.metrics.map((metric) => (
                    <div key={metric.label} className="p-3 bg-white/[0.02] border border-white/5">
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-[#B7AA97]">
                        {metric.label}
                      </span>
                      <span className="font-serif text-lg sm:text-xl text-[#FAF8F4] font-light mt-1 block">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Stepper Action */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#FAF8F4]/60">
                S.M.S DECORS · CHENNAI EST. 2015
              </span>

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E5C384] hover:text-[#FAF8F4] transition-colors"
              >
                <span>NEXT DISCIPLINE</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
