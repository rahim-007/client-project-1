import { VERIFIED_CLIENTS } from '../data/clients';
import { Buildings, GraduationCap, Factory, Gear } from '@phosphor-icons/react';

export function ClientsMarquee() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Education':
        return <GraduationCap size={16} className="text-[#9C805B]" />;
      case 'Corporate':
        return <Buildings size={16} className="text-[#9C805B]" />;
      case 'Manufacturing':
        return <Factory size={16} className="text-[#9C805B]" />;
      case 'Engineering':
        return <Gear size={16} className="text-[#9C805B]" />;
      default:
        return <Buildings size={16} className="text-[#9C805B]" />;
    }
  };

  return (
    <section
      id="clients"
      data-sc-act="clients"
      className="py-24 sm:py-36 bg-[#F3EFE8] text-[#171715] relative overflow-hidden border-t border-[#B7AA97]/25"
      aria-label="Verified Institutional & Corporate Clients"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#B7AA97]/25 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9C805B] block mb-3">
              CLIENT ROSTER
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#171715] leading-[1.08]">
              Trusted by Institutions &amp; Enterprises<span className="text-[#9C805B]">.</span>
            </h2>
            <p className="mt-3 text-base text-[#171715]/75 font-light max-w-xl leading-relaxed">
              From Chennai’s premier educational institutions to prominent industrial and corporate headquarters, we deliver architectural environments built to endure.
            </p>
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-[#9C805B] bg-[#FAF8F4] border border-[#B7AA97]/30 px-4 py-2 rounded-full">
            <span>VERIFIED RELATIONSHIPS</span>
          </div>
        </div>

        {/* Typographic Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VERIFIED_CLIENTS.map((client) => (
            <div
              key={client.id}
              className="p-6 rounded-none bg-[#FAF8F4] border border-[#B7AA97]/30 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#9C805B] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9C805B]">
                  {getCategoryIcon(client.category)}
                  <span>{client.category}</span>
                </div>
                <span className="text-[10px] font-mono text-[#171715]/50 uppercase tracking-widest">
                  {client.location}
                </span>
              </div>

              <h3 className="font-serif text-xl font-normal text-[#171715] group-hover:text-[#9C805B] transition-colors leading-snug">
                {client.name}
              </h3>

              <div className="mt-6 pt-3 border-t border-[#B7AA97]/20 flex items-center justify-between text-[10px] font-mono text-[#9C805B] uppercase">
                <span>VERIFIED ENGAGEMENT</span>
                <span>CHENNAI</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restrained Architectural Marquee */}
      <div className="w-full bg-[#171715] py-5 border-y border-white/10 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
          {[...VERIFIED_CLIENTS, ...VERIFIED_CLIENTS].map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="inline-flex items-center mx-8 text-sm md:text-base font-serif font-light tracking-widest text-[#FAF8F4]/80 uppercase"
            >
              <span>{client.name}</span>
              <span className="mx-6 text-xs text-[#9C805B]">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
