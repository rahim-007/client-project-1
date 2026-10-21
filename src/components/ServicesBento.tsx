import { SERVICES_DATA } from '../data/services';
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react';

interface ServicesBentoProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesBento({ onSelectService }: ServicesBentoProps) {
  return (
    <section
      id="services"
      className="py-24 sm:py-36 md:py-44 bg-[#F3EFE7] text-[#292A26] relative overflow-hidden"
      aria-label="Architectural Disciplines & Services"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[#8A7658]/20 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#8A7658]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8A7658]">
                04 / ARCHITECTURAL DISCIPLINES
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#292A26]">
              Mastery in Scale &amp; Detail<span className="text-[#8A7658]">.</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#292A26]/80 font-light max-w-xl">
              We operate across all scales of interior intervention — from raw spatial renovation to bespoke carpentry and acoustic ceiling engineering.
            </p>
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-[#8A7658] bg-[#D5DCCF]/40 border border-[#8A7658]/20 px-4 py-2 rounded-full">
            <span>TURNKEY INTEGRATION · CHENNAI</span>
          </div>
        </div>

        {/* Gapless Bento Grid with grid-flow-dense */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 grid-flow-dense">
          {SERVICES_DATA.map((service, idx) => {
            // Asymmetric layout logic for gapless bento interlocking:
            // Item 1 (Interior Works): col-span-12 lg:col-span-7
            // Item 2 (Complete Renovation): col-span-12 lg:col-span-5
            // Item 3 (Modular & Carpentry): col-span-12 lg:col-span-5
            // Item 4 (Ceiling & Electrical): col-span-12 lg:col-span-7
            const isWide = idx === 0 || idx === 3;
            const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <div
                key={service.id}
                className={`${colSpanClass} col-span-12 group rounded-[2.2rem] bg-white/70 border border-[#8A7658]/20 p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-[#8A7658]/60 transition-all duration-500`}
              >
                {/* Image Showcase Frame */}
                <div className="relative h-64 sm:h-72 md:h-80 w-full rounded-[1.6rem] overflow-hidden mb-6 bg-[#292A26]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292A26]/80 via-transparent to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="font-mono text-xs text-[#F3EFE7] bg-[#292A26]/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                      DISCIPLINE {service.number}
                    </span>
                    <span className="text-[10px] font-mono text-[#292A26] bg-[#D5DCCF]/90 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#8A7658]">
                      {service.subtitle}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#292A26] group-hover:text-[#8A7658] transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-[#292A26]/75 font-light leading-relaxed">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="mt-6 space-y-2.5 pt-4 border-t border-[#8A7658]/15">
                      <span className="block text-[11px] font-mono uppercase tracking-widest text-[#8A7658] mb-2">
                        SPECIALIZED SCOPE &amp; DELIVERABLES
                      </span>
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-xs text-[#292A26]/80 font-light">
                          <CheckCircle size={15} className="text-[#8A7658] shrink-0 mt-0.5" weight="fill" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-8 pt-6 border-t border-[#8A7658]/20 flex items-center justify-between">
                    <button
                      onClick={() => onSelectService(service.title)}
                      className="group/btn flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#292A26] hover:text-[#8A7658] transition-colors"
                    >
                      <span className="font-semibold">INQUIRE ABOUT THIS DISCIPLINE</span>
                      <div className="w-7 h-7 rounded-full bg-[#8A7658] text-[#F3EFE7] flex items-center justify-center transition-transform group-hover/btn:translate-x-1">
                        <ArrowUpRight size={14} weight="bold" />
                      </div>
                    </button>
                    <span className="font-mono text-xs text-[#8A7658]">EST. 2015</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
