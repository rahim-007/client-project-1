import { useState, useEffect } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

interface NavbarProps {
  onOpenContact: () => void;
}

export function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition beyond hero (at ~80vh of scroll or when passing hero)
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // If bottom of hero is near top of viewport
        setIsScrolledPastHero(rect.bottom < window.innerHeight * 0.3);
      } else {
        setIsScrolledPastHero(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Our Approach', href: '#approach' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolledPastHero
          ? 'bg-[#F3EFE8]/95 text-[#171715] backdrop-blur-md border-b border-[#B7AA97]/25 py-4 shadow-[0_4px_24px_-8px_rgba(23,23,21,0.06)]'
          : 'bg-transparent text-[#FAF8F4] py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Left: S.M.S DECORS Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9C805B]"
          aria-label="S.M.S DECORS Homepage"
        >
          <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.22em] uppercase leading-none">
            S.M.S DECORS
          </span>
          <span
            className={`text-[9px] font-mono tracking-[0.3em] uppercase mt-1 transition-colors ${
              isScrolledPastHero ? 'text-[#9C805B]' : 'text-[#FAF8F4]/60'
            }`}
          >
            CHENNAI · EST. 2015
          </span>
        </a>

        {/* Right Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className={`text-xs uppercase tracking-[0.18em] transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9C805B] ${
                isScrolledPastHero
                  ? 'text-[#171715]/75 hover:text-[#9C805B]'
                  : 'text-[#FAF8F4]/80 hover:text-[#FAF8F4]'
              }`}
            >
              {item.label}
            </a>
          ))}

          <button
            onClick={onOpenContact}
            className={`ml-4 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 active:scale-[0.98] ${
              isScrolledPastHero
                ? 'bg-[#171715] text-[#FAF8F4] hover:bg-[#9C805B]'
                : 'bg-[#FAF8F4] text-[#171715] hover:bg-white'
            }`}
          >
            <span>Inquire</span>
            <ArrowUpRight size={13} weight="bold" />
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden relative w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#9C805B] transition-colors ${
            isScrolledPastHero
              ? 'text-[#171715] bg-[#171715]/5 hover:bg-[#171715]/10'
              : 'text-[#FAF8F4] bg-white/10 hover:bg-white/15'
          }`}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          <span
            className={`w-4 h-[1px] bg-current transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
            }`}
          />
          <span
            className={`w-4 h-[1px] bg-current transition-transform duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Accessible Mobile Compact Menu */}
      <div
        className={`fixed inset-0 bg-[#171715] text-[#FAF8F4] flex flex-col justify-between p-8 z-50 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.2em] font-light text-[#FAF8F4]">
              S.M.S DECORS
            </span>
            <span className="text-[9px] tracking-[0.3em] font-mono text-[#9C805B]">
              CHENNAI · INDIA
            </span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-mono focus:outline-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col space-y-6 my-auto" aria-label="Mobile Navigation">
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-[#9C805B] transition-colors"
            >
              <span className="font-serif text-3xl font-light tracking-wide group-hover:text-[#9C805B] transition-colors">
                {item.label}
              </span>
              <span className="font-mono text-xs text-[#9C805B]">
                0{idx + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full py-3.5 rounded-full bg-[#FAF8F4] text-[#171715] font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <span>Start Your Project</span>
            <ArrowUpRight size={14} weight="bold" />
          </button>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#FAF8F4]/60 pt-2">
            <span>Chennai, Tamil Nadu</span>
            <a href="tel:+919841213025" className="hover:text-[#9C805B]">
              +91 98412 13025
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
