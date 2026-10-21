import { ArrowUp, Phone, EnvelopeSimple, MapPin } from '@phosphor-icons/react';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Our Approach', href: '#approach' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      className="bg-[#171715] text-[#FAF8F4] pt-20 pb-12 border-t border-white/10 relative overflow-hidden"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Top Minimal Wordmark & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <span className="font-serif text-3xl sm:text-5xl font-light tracking-[0.16em] uppercase block text-[#FAF8F4]">
              S.M.S DECORS
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#9C805B] mt-2 block">
              CHENNAI, TAMIL NADU, INDIA
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#B7AA97] hover:text-[#FAF8F4] transition-colors self-start sm:self-auto"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} weight="bold" className="group-hover:-translate-y-0.5 transition-transform text-[#9C805B]" />
          </button>
        </div>

        {/* Minimal Navigation & Direct Details */}
        <div className="py-12 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-mono">
          {/* Navigation Links */}
          <div className="md:col-span-5 flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#FAF8F4]/80 hover:text-[#9C805B] transition-colors uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Verified Phone & Email */}
          <div className="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-x-8 gap-y-3 text-[#FAF8F4]/80">
            <a
              href="tel:+919841213025"
              className="flex items-center gap-2 hover:text-[#9C805B] transition-colors"
            >
              <Phone size={13} className="text-[#9C805B]" />
              <span>+91 98412 13025</span>
            </a>

            <a
              href="mailto:smsdecorskumaran@gmail.com"
              className="flex items-center gap-2 hover:text-[#9C805B] transition-colors"
            >
              <EnvelopeSimple size={13} className="text-[#9C805B]" />
              <span>smsdecorskumaran@gmail.com</span>
            </a>

            <span className="flex items-center gap-2 text-[#B7AA97]">
              <MapPin size={13} className="text-[#9C805B]" />
              <span>Perungudi, Chennai - 600 096</span>
            </span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#FAF8F4]/50">
          <span>
            © {CURRENT_YEAR} S.M.S DECORS. All rights reserved.
          </span>
          <span className="text-[#9C805B]/80 uppercase tracking-widest">
            Architectural Interior Atelier · Chennai
          </span>
        </div>
      </div>
    </footer>
  );
}
