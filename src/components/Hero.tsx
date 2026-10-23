import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Compass } from '@phosphor-icons/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HeroProps {
  onExploreWork: () => void;
  onDiscussProject: () => void;
}

const TOTAL_FRAMES = 240;

export function Hero({ onExploreWork, onDiscussProject }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const animationFrameRef = useRef<number | null>(null);

  const [initialFrameLoaded, setInitialFrameLoaded] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Responsive frame directory: detects mobile/portrait screen vs desktop widescreen
  const [frameDir, setFrameDir] = useState<string>(() => {
    if (typeof window === 'undefined') return '/frames';
    const isPortrait = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
    return isPortrait ? '/frames-mobile' : '/frames';
  });

  // Direct 1:1 scroll tracking: zero input lag, 100% responsive to user wheel & trackpad
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Stage 1: Introduction (0 – 23%) Centered
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.23], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.15, 0.23], [0, 0, -20]);
  const stage1Pointer = useTransform(scrollYProgress, (p) => (p <= 0.21 ? 'auto' : 'none'));

  // Stage 2: "01 / THE ART OF LIVING" (23 – 57%) Left side - PINNED DWELL PLATEAU (0.29 -> 0.51)
  const stage2Opacity = useTransform(
    scrollYProgress,
    [0.23, 0.29, 0.51, 0.57],
    [0, 1, 1, 0]
  );
  const stage2Y = useTransform(
    scrollYProgress,
    [0.23, 0.29, 0.51, 0.57],
    [20, 0, 0, -20]
  );
  const stage2Pointer = useTransform(scrollYProgress, (p) =>
    p >= 0.24 && p <= 0.56 ? 'auto' : 'none'
  );

  // Stage 3: "02 / MATERIALS & DETAIL" (57 – 89%) Right side - PINNED DWELL PLATEAU (0.63 -> 0.84)
  const stage3Opacity = useTransform(
    scrollYProgress,
    [0.57, 0.63, 0.84, 0.90],
    [0, 1, 1, 0]
  );
  const stage3Y = useTransform(
    scrollYProgress,
    [0.57, 0.63, 0.84, 0.90],
    [20, 0, 0, -20]
  );
  const stage3Pointer = useTransform(scrollYProgress, (p) =>
    p >= 0.58 && p <= 0.89 ? 'auto' : 'none'
  );

  // Stage 4: Finale & Vision (89 – 100%) Centered - PINNED DWELL PLATEAU (0.94 -> 1.00)
  const stage4Opacity = useTransform(
    scrollYProgress,
    [0.89, 0.94, 1.0],
    [0, 1, 1]
  );
  const stage4Y = useTransform(
    scrollYProgress,
    [0.89, 0.94, 1.0],
    [20, 0, 0]
  );
  const stage4Pointer = useTransform(scrollYProgress, (p) => (p >= 0.90 ? 'auto' : 'none'));

  // Scrim opacity drivers localized to active text blocks - calibrated for vibrant architectural clarity
  const leftScrimOpacity = useTransform(
    scrollYProgress,
    [0.21, 0.28, 0.52, 0.58],
    [0, 0.55, 0.55, 0]
  );
  const rightScrimOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.62, 0.85, 0.91],
    [0, 0.55, 0.55, 0]
  );


  // Draw image preserving composition with high-definition cover framing
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    if (!iw || !ih) return;

    // Aspect ratio fill
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.drawImage(img, nx, ny, nw, nh);
  }, []);

  // Handle canvas sizing with high-DPI Retina support and high-precision smoothing
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Responsive orientation detection: switch seamlessly between portrait and landscape frame sequences
    const isPortrait = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
    const currentDir = isPortrait ? '/frames-mobile' : '/frames';
    setFrameDir(prev => (prev !== currentDir ? currentDir : prev));

    // Support crisp Retina displays (up to 2.0x DPR, avoiding blurriness on 3x screens while keeping 60fps)
    const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext('2d', { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    const activeIndex = Math.max(0, lastDrawnFrameRef.current);
    const img = imagesRef.current[activeIndex] || imagesRef.current[0];
    if (img && img.complete && img.naturalWidth > 0) {
      drawFrame(img);
    }
  }, [drawFrame]);

  // Non-linear camera frame progression: camera softly holds during stuck plateaus
  const getFrameForProgress = useCallback((p: number): number => {
    const t = Math.max(0, Math.min(1, p));
    if (t <= 0.16) {
      const factor = t / 0.16;
      return Math.round(factor * 24);
    } else if (t <= 0.29) {
      const factor = (t - 0.16) / (0.29 - 0.16);
      return Math.round(24 + factor * (78 - 24));
    } else if (t <= 0.51) {
      // Stuck in The Art of Living (camera gently hovers in living room: frames 78 -> 84)
      const factor = (t - 0.29) / (0.51 - 0.29);
      return Math.round(78 + factor * (84 - 78));
    } else if (t <= 0.63) {
      // Transition from Art of Living to Materials & Detail
      const factor = (t - 0.51) / (0.63 - 0.51);
      return Math.round(84 + factor * (158 - 84));
    } else if (t <= 0.84) {
      // Stuck in Materials & Detail (camera gently hovers on material details: frames 158 -> 165)
      const factor = (t - 0.63) / (0.84 - 0.63);
      return Math.round(158 + factor * (165 - 158));
    } else if (t <= 0.94) {
      // Transition to final wide shot
      const factor = (t - 0.84) / (0.94 - 0.84);
      return Math.round(165 + factor * (239 - 165));
    } else {
      return TOTAL_FRAMES - 1;
    }
  }, []);

  // High-Performance Interleaved Preloader: loads skeleton instantly with async off-thread decoding
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const loadSingleFrame = (idx: number, onLoaded?: () => void) => {
      if (images[idx]) return images[idx];
      const img = new Image();
      img.decoding = 'async';
      const frameNum = String(idx + 1).padStart(4, '0');
      img.src = `${frameDir}/frame-${frameNum}.jpg`;
      img.onload = () => {
        if (onLoaded) onLoaded();
        if (Math.abs(targetFrameRef.current - idx) <= 2) {
          drawFrame(img);
          lastDrawnFrameRef.current = idx;
        }
      };
      images[idx] = img;
      return img;
    };

    // Priority 1: Keyframe 0 loads immediately for instant first paint
    loadSingleFrame(0, () => {
      setInitialFrameLoaded(true);
      handleResize();
      if (images[0]) {
        drawFrame(images[0]);
        lastDrawnFrameRef.current = 0;
      }
    });

    // Priority 2: Skeleton sweep across the entire sequence (every 4th frame: 0, 4, 8... 239)
    for (let i = 0; i < TOTAL_FRAMES; i += 4) {
      loadSingleFrame(i);
    }
    loadSingleFrame(TOTAL_FRAMES - 1);

    // Priority 3: Interleaved sweep (every 2nd frame)
    const timer1 = setTimeout(() => {
      for (let i = 2; i < TOTAL_FRAMES; i += 4) {
        loadSingleFrame(i);
      }
    }, 40);

    // Priority 4: Full continuous density (all remaining odd frames)
    const timer2 = setTimeout(() => {
      for (let i = 1; i < TOTAL_FRAMES; i += 2) {
        loadSingleFrame(i);
      }
    }, 120);

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame, handleResize, frameDir]);

  // Sync scrollYProgress directly with state-change guard (prevents unnecessary re-renders)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      targetProgressRef.current = Math.max(0, Math.min(1, latest));
    });

    return () => unsubscribe();
  }, [scrollYProgress, prefersReducedMotion]);

  // High-performance direct RAF render loop with responsive, lag-free lerp
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * 0.45;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      // Map progress to camera frame with hold plateaus
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, getFrameForProgress(currentProgressRef.current))
      );
      targetFrameRef.current = frameIndex;

      // Update frame counter directly in DOM without triggering React re-renders
      if (frameCounterRef.current) {
        frameCounterRef.current.textContent = `FRAME ${String(frameIndex + 1).padStart(3, '0')} / 240`;
      }

      // Search for the closest available loaded frame if target is still buffering
      let imgToRender = imagesRef.current[frameIndex];
      let actualDrawnIndex = frameIndex;

      if (!imgToRender || !imgToRender.complete || imgToRender.naturalWidth === 0) {
        for (let j = frameIndex - 1; j >= 0; j--) {
          const candidate = imagesRef.current[j];
          if (candidate && candidate.complete && candidate.naturalWidth > 0) {
            imgToRender = candidate;
            actualDrawnIndex = j;
            break;
          }
        }
        if (!imgToRender) {
          for (let j = frameIndex + 1; j < TOTAL_FRAMES; j++) {
            const candidate = imagesRef.current[j];
            if (candidate && candidate.complete && candidate.naturalWidth > 0) {
              imgToRender = candidate;
              actualDrawnIndex = j;
              break;
            }
          }
        }
      }

      // Draw only if frame changed
      if (imgToRender && imgToRender.complete && imgToRender.naturalWidth > 0) {
        if (lastDrawnFrameRef.current !== actualDrawnIndex) {
          drawFrame(imgToRender);
          lastDrawnFrameRef.current = actualDrawnIndex;
        }
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawFrame, getFrameForProgress, prefersReducedMotion]);

  // Reduced motion alternative: static cinematic frame
  if (prefersReducedMotion) {
    return (
      <section id="hero" className="relative w-full min-h-screen bg-[#171715] text-[#FAF8F4] flex items-center justify-center p-8 sm:p-16">
        <div className="absolute inset-0">
          <img
            src={`${frameDir}/frame-0001.jpg`}
            alt="S.M.S DECORS Luxury Architectural Interior"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-[#171715]/40" />
        </div>
        <div className="relative z-10 max-w-4xl text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#B7AA97]">
            CRAFTED FOR THE WAY YOU LIVE
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-light tracking-tight text-[#FAF8F4]">
            Spaces that speak.
          </h1>
          <p className="text-lg text-[#FAF8F4]/85 max-w-xl mx-auto font-light leading-relaxed">
            Interiors shaped around your life, your taste, your vision. S.M.S DECORS sculpts private residential sanctuaries and bespoke interiors in Chennai.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={onExploreWork}
              className="px-8 py-3.5 rounded-full bg-[#FAF8F4] text-[#171715] font-medium text-xs uppercase tracking-[0.18em]"
            >
              Explore Our Work
            </button>
            <button
              onClick={onDiscussProject}
              className="px-8 py-3.5 rounded-full border border-white/30 text-[#FAF8F4] font-medium text-xs uppercase tracking-[0.18em]"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      data-sc-act="scrub"
      className="relative w-full h-[360vh] bg-[#171715] text-[#FAF8F4]"
      aria-label="Cinematic Architectural Sequence"
    >
      {/* Pinned Viewport Canvas Stage (100dvh) */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between pb-6">
        {/* HTML5 Canvas for continuous scroll-controlled frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform contrast-[1.04] brightness-[1.02]"
        />

        {/* Fallback poster while frame 1 loads */}
        {!initialFrameLoaded && (
          <img
            src={`${frameDir}/frame-0001.jpg`}
            alt="Architectural Interior Establishing Shot"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Subtle Ambient Vignettes: gentle top/bottom gradient so architectural lighting remains radiant */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#171715]/75 via-transparent to-[#171715]/45 pointer-events-none"
          aria-hidden="true"
        />

        {/* Dynamic localized scrims behind Stage 2 (Left) and Stage 3 (Right) */}
        <motion.div
          style={{ opacity: leftScrimOpacity }}
          className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-t md:bg-gradient-to-r from-[#171715]/80 via-[#171715]/35 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          style={{ opacity: rightScrimOpacity }}
          className="absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-t md:bg-gradient-to-l from-[#171715]/80 via-[#171715]/35 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* TOP STATUS BAR HUD */}
        <div className="relative z-20 pt-20 sm:pt-24 px-6 sm:px-12 md:px-16 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#FAF8F4] pointer-events-auto [text-shadow:_0_1px_6px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#E5C384] animate-pulse" />
            <span className="text-[#FAF8F4] font-medium tracking-wider">S.M.S DECORS · ARCHITECTURAL WALKTHROUGH</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/15 text-[10px] text-[#E5C384] backdrop-blur-sm">
              <Compass size={12} className="text-[#E5C384]" weight="bold" />
              <span ref={frameCounterRef}>FRAME 001 / 240</span>
            </div>
            <span className="text-white/40">|</span>
            <span className="text-[#FAF8F4]/90">CHENNAI ATELIER</span>
          </div>
        </div>

        {/* NARRATIVE STAGE OVERLAYS (EXACT 4 STAGES IN UNIFIED GRID CELL WITH DWELL LOCK) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 grid grid-cols-1 grid-rows-1 items-center pointer-events-none my-auto">
          {/* ================= STAGE 1: INTRODUCTION (0 – 23%) Centered ================= */}
          <motion.div
            style={{
              opacity: stage1Opacity,
              y: stage1Y,
              pointerEvents: stage1Pointer,
            }}
            className="col-start-1 row-start-1 w-full text-center max-w-3xl mx-auto flex flex-col items-center pointer-events-auto"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#E5C384] mb-4 [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
              CRAFTED FOR THE WAY YOU LIVE
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-light tracking-tight text-[#FFFFFF] leading-[1.04] [text-shadow:_0_2px_14px_rgba(0,0,0,0.85),_0_1px_4px_rgba(0,0,0,0.95)]">
              Spaces that speak<span className="text-[#E5C384]">.</span>
            </h1>

            <p className="mt-5 text-base sm:text-xl text-[#FFFFFF] font-medium sm:font-normal leading-relaxed max-w-xl [text-shadow:_0_1px_3px_rgba(0,0,0,1),_0_2px_12px_rgba(0,0,0,0.95),_0_0_24px_rgba(0,0,0,0.85)]">
              Interiors shaped around your life, your taste, your vision.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onExploreWork}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#FAF8F4] text-[#171715] font-medium text-xs tracking-[0.18em] uppercase hover:bg-white transition-all duration-300 shadow-xl active:scale-[0.98]"
              >
                <span>EXPLORE OUR WORK</span>
                <ArrowDown size={13} weight="bold" className="group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onDiscussProject}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#171715]/60 hover:bg-[#171715]/80 border border-white/30 text-[#FAF8F4] text-xs font-medium tracking-[0.18em] uppercase backdrop-blur-sm transition-all shadow-lg active:scale-[0.98]"
              >
                <span>START YOUR PROJECT</span>
              </button>
            </div>
          </motion.div>

          {/* ================= STAGE 2: LIVING SPACES (23 – 57%) Left side - STUCK ON THE ART OF LIVING ================= */}
          <motion.div
            style={{
              opacity: stage2Opacity,
              y: stage2Y,
              pointerEvents: stage2Pointer,
            }}
            className="col-start-1 row-start-1 w-full max-w-xl text-left pointer-events-auto mr-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C384]/35 mb-4 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#E5C384] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#E5C384] font-medium">
                01 / THE ART OF LIVING
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FFFFFF] leading-[1.08] [text-shadow:_0_2px_14px_rgba(0,0,0,0.85),_0_1px_4px_rgba(0,0,0,0.95)]">
              A feeling called home<span className="text-[#E5C384]">.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#FAF8F4] font-light leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
              Thoughtful layouts, tactile materials and considered details come together to create spaces that feel unmistakably yours.
            </p>

            {/* Architectural Discipline Tags */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 text-[11px] font-mono tracking-wider text-[#FAF8F4]/85 backdrop-blur-sm">
                SPATIAL PROPORTION
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 text-[11px] font-mono tracking-wider text-[#FAF8F4]/85 backdrop-blur-sm">
                NATURAL ILLUMINATION
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 text-[11px] font-mono tracking-wider text-[#FAF8F4]/85 backdrop-blur-sm">
                CHENNAI SANCTUARY
              </span>
            </div>
          </motion.div>

          {/* ================= STAGE 3: MATERIAL & DETAILS (57 – 89%) Right side - STUCK ON MATERIALS & DETAIL ================= */}
          <motion.div
            style={{
              opacity: stage3Opacity,
              y: stage3Y,
              pointerEvents: stage3Pointer,
            }}
            className="col-start-1 row-start-1 w-full max-w-xl ml-auto text-left md:text-right pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C384]/35 mb-4 shadow-lg md:ml-auto">
              <span className="w-2 h-2 rounded-full bg-[#E5C384] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#E5C384] font-medium">
                02 / MATERIALS &amp; DETAIL
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FFFFFF] leading-[1.08] [text-shadow:_0_2px_14px_rgba(0,0,0,0.85),_0_1px_4px_rgba(0,0,0,0.95)]">
              Every detail matters<span className="text-[#E5C384]">.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#FAF8F4] font-light leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
              From warm timber and refined finishes to light, texture and proportion, every element has a purpose.
            </p>

            {/* Architectural Discipline Tags */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 md:justify-end">
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 text-[11px] font-mono tracking-wider text-[#FAF8F4]/85 backdrop-blur-sm">
                SEASONED TEAK
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 text-[11px] font-mono tracking-wider text-[#FAF8F4]/85 backdrop-blur-sm">
                ROMAN TRAVERTINE
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 text-[11px] font-mono tracking-wider text-[#FAF8F4]/85 backdrop-blur-sm">
                FLUTED GLASS &amp; BRONZE
              </span>
            </div>
          </motion.div>

          {/* ================= STAGE 4: FINAL CINEMATIC FRAME (89 – 100%) Centered ================= */}
          <motion.div
            style={{
              opacity: stage4Opacity,
              y: stage4Y,
              pointerEvents: stage4Pointer,
            }}
            className="col-start-1 row-start-1 w-full text-center max-w-3xl mx-auto flex flex-col items-center pointer-events-auto"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#E5C384] mb-4 [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
              S.M.S DECORS · CHENNAI
            </span>

            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#FFFFFF] leading-[1.04] [text-shadow:_0_2px_14px_rgba(0,0,0,0.85),_0_1px_4px_rgba(0,0,0,0.95)]">
              Your vision. Our craft<span className="text-[#E5C384]">.</span>
            </h2>

            <p className="mt-5 text-base sm:text-xl text-[#FAF8F4] font-light leading-relaxed max-w-xl [text-shadow:_0_1px_8px_rgba(0,0,0,0.85)]">
              Let&apos;s create a space worth coming home to.
            </p>

            <div className="mt-8">
              <button
                onClick={onDiscussProject}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#FAF8F4] text-[#171715] font-medium text-xs tracking-[0.18em] uppercase hover:bg-white transition-all duration-300 shadow-xl active:scale-[0.98]"
              >
                <span>START YOUR PROJECT</span>
                <ArrowUpRight size={14} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
