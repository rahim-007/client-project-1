import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        const increment = Math.floor(Math.random() * 20) + 12;
        return Math.min(100, prev + increment);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#171715] text-[#FAF8F4] p-8 md:p-14 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading architectural portfolio"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase text-[#9C805B] font-mono">
        <span>S.M.S DECORS · ATELIER</span>
        <span>CHENNAI · EST. 2015</span>
      </div>

      {/* Center Wordmark & Tagline */}
      <div className="my-auto max-w-4xl">
        <p className="text-xs tracking-[0.3em] uppercase text-[#B7AA97] mb-4">
          Interior Architecture &amp; Decoration
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-[#FAF8F4] leading-tight">
          Spaces That Speak<span className="text-[#9C805B]">.</span>
        </h1>
        <p className="mt-4 text-sm font-light text-[#FAF8F4]/75 max-w-lg">
          Crafting bespoke residential living, executive workspaces, and comprehensive architectural renovations across Chennai.
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full">
        <div className="flex items-end justify-between mb-3 text-xs tracking-widest font-mono">
          <span className="text-[#9C805B]">INITIALIZING ATELIER SEQUENCE</span>
          <span className="text-[#FAF8F4] font-medium">{progress}%</span>
        </div>
        <div className="w-full h-[1px] bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#9C805B] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
