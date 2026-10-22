import { motion } from 'framer-motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  focus: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      "Understand the client's lifestyle, requirements, budget, and aesthetic preferences.",
    focus: 'Spatial brief & functional discovery',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Develop the layout, material palette, and interior design direction.',
    focus: 'Scale plans, timber selection & lighting',
  },
  {
    number: '03',
    title: 'Refine',
    description:
      'Review details, finishes, and selections before execution.',
    focus: 'Joinery samples & mockups review',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'Coordinate the final details to bring the approved vision to life.',
    focus: 'Turnkey handover & white-glove finish',
  },
];

export function OurProcess() {
  return (
    <section
      id="process"
      data-sc-act="process"
      className="py-28 sm:py-36 md:py-44 bg-[#F3EFE8] text-[#171715] relative overflow-hidden"
      aria-label="Our Process"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#7F6847] font-medium block mb-3">
            METHODOLOGY
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#171715] leading-[1.08]">
            A deliberate journey from brief to sanctuary<span className="text-[#7F6847]">.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#171715]/90 font-light leading-relaxed">
            Our engagement proceeds through four disciplined stages, ensuring clarity, accountability, and seamless execution.
          </p>
        </div>

        {/* Clean horizontal sequence on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 lg:gap-8 relative">
          {/* Top connecting thin architectural line on desktop */}
          <div
            className="hidden md:block absolute top-7 left-0 right-0 h-[1px] bg-[#B7AA97]/30 -z-0"
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((step, idx) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col justify-between pt-6 md:pt-12 md:border-t-0 border-t border-[#B7AA97]/30"
            >
              <div>
                {/* Step indicator node */}
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#7F6847] font-semibold">
                    {step.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#7F6847]" />
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#171715] mb-4">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base text-[#171715]/90 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#B7AA97]/20">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7F6847] font-medium">
                  KEY FOCUS
                </span>
                <p className="text-xs text-[#171715]/90 font-light mt-1">
                  {step.focus}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
