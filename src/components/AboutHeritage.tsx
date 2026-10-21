import { ShieldCheck, Check, MapPin, CalendarBlank } from '@phosphor-icons/react';

export function AboutHeritage() {
  const pillars = [
    {
      title: 'Practical Execution',
      description:
        'A magnificent design is meaningless without disciplined execution. We anchor every project with on-site technical coordination, verified material grades, and transparent milestone management.',
      icon: ShieldCheck,
    },
    {
      title: 'Material Integrity',
      description:
        'We select woods, stones, metals, and plasters that withstand Chennai’s coastal climate, ensuring the built environment retains its quiet elegance for decades.',
      icon: Check,
    },
    {
      title: 'Useful, Beautiful Spaces',
      description:
        'We reject superficial decoration. Every ceiling cove, storage bulkhead, and joinery interface serves a clear spatial purpose — creating spaces that are effortlessly functional to live and work in.',
      icon: MapPin,
    },
  ];

  return (
    <section
      id="about"
      data-sc-act="heritage"
      className="py-28 sm:py-36 md:py-44 bg-[#171715] text-[#FAF8F4] relative overflow-hidden border-t border-white/10"
      aria-label="About S.M.S DECORS Craft & Heritage"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 border-b border-white/10 pb-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9C805B] block mb-3">
              ATELIER HERITAGE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#FAF8F4] leading-[1.08]">
              Established in Chennai, 2015<span className="text-[#9C805B]">.</span>
            </h2>
            <div className="mt-6 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#B7AA97]">
              <CalendarBlank size={16} />
              <span>Dedicated Physical Architectural Practice</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#FAF8F4]/80 font-light leading-relaxed">
            <p>
              Founded in 2015 in Perungudi, Chennai, <strong className="text-[#FAF8F4] font-medium">S.M.S DECORS</strong> emerged from a clear architectural conviction: interior architecture should prioritize craftsmanship, authentic materiality, and practical execution over ephemeral trends.
            </p>
            <p>
              Over nearly a decade of dedicated spatial practice across Tamil Nadu, our studio has delivered refined residential sanctuaries, executive workspaces, and complete structural renovations. We do not believe in superficial facade-work. Every joint, partition, and illuminated plane is engineered to serve the daily rituals of the people who inhabit it.
            </p>
          </div>
        </div>

        {/* Studio Craft Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 border border-white/10 bg-white/[0.02] flex flex-col justify-between transition-all duration-300 hover:border-[#9C805B]/60 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#9C805B]/15 text-[#9C805B] flex items-center justify-center mb-6">
                    <Icon size={22} weight="light" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#FAF8F4] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#FAF8F4]/75 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9C805B] uppercase">
                  <span>FOUNDATIONAL PILLAR</span>
                  <span>CHENNAI</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Atelier Coordinates */}
        <div className="mt-16 p-8 border border-[#9C805B]/30 bg-[#9C805B]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9C805B]" />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FAF8F4] block">
                PHYSICAL ATELIER &amp; WORKSHOP
              </span>
              <p className="text-sm font-light text-[#FAF8F4]/80 mt-0.5">
                No. 25, Seevaram 2nd Street, Perungudi, Chennai - 600 096
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#B7AA97]">
            <span>12°57&apos;49&quot;N 80°14&apos;43&quot;E</span>
            <span>·</span>
            <span>TAMIL NADU, INDIA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
