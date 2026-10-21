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

  // Scroll tracking: compact, responsive 200vh height eliminating all unwanted dead space
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Stage 1: Introduction (0 – 20%) Centered
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.14, 0.20], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.14, 0.20], [0, 0, -20]);
  const stage1Pointer = useTransform(scrollYProgress, (p) => (p <= 0.20 ? 'auto' : 'none'));

  // Stage 2: Living spaces (20 – 45%) Left side
  const stage2Opacity = useTransform(scrollYProgress, [0.20, 0.26, 0.39, 0.45], [0, 1, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.20, 0.26, 0.39, 0.45], [20, 0, 0, -20]);
  const stage2Pointer = useTransform(scrollYProgress, (p) =>
    p >= 0.20 && p <= 0.45 ? 'auto' : 'none'
  );

  // Stage 3: Material and architectural details (45 – 75%) Right side
  const stage3Opacity = useTransform(scrollYProgress, [0.45, 0.52, 0.68, 0.75], [0, 1, 1, 0]);
  const stage3Y = useTransform(scrollYProgress, [0.45, 0.52, 0.68, 0.75], [20, 0, 0, -20]);
  const stage3Pointer = useTransform(scrollYProgress, (p) =>
    p >= 0.45 && p <= 0.75 ? 'auto' : 'none'
  );

  // Stage 4: Final cinematic frame (75 – 100%) Centered
  // Reaches full opacity by 0.82 and holds firmly through 1.00 for clear dwell
  const stage4Opacity = useTransform(scrollYProgress, [0.75, 0.82, 1.0], [0, 1, 1]);
  const stage4Y = useTransform(scrollYProgress, [0.75, 0.82, 1.0], [20, 0, 0]);
  const stage4Pointer = useTransform(scrollYProgress, (p) => (p >= 0.75 ? 'auto' : 'none'));

  // Scrim opacity drivers localized to active text blocks
  const leftScrimOpacity = useTransform(scrollYProgress, [0.18, 0.25, 0.40, 0.47], [0, 0.6, 0.6, 0]);
  const rightScrimOpacity = useTransform(scrollYProgress, [0.43, 0.50, 0.70, 0.77], [0, 0.6, 0.6, 0]);

  // Draw image preserving 16:9 composition without distortion
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    if (!iw || !ih) return;

    // Aspect ratio fill
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, nx, ny, nw, nh);
  }, []);

  // Handle canvas sizing with device pixel ratio cap
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const activeIndex = Math.max(0, lastDrawnFrameRef.current);
    const img = imagesRef.current[activeIndex] || imagesRef.current[0];
    if (img && img.complete && img.naturalWidth > 0) {
      drawFrame(img);
    }
  }, [drawFrame]);

  // Fast Milestone-First Preloader: loads key frames immediately, then streams rest
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // Priority 1: Key architectural milestones loaded immediately
    const keyframes = [0, 59, 119, 179, 239];
    keyframes.forEach((idx) => {
      const img = new Image();
      const frameNum = String(idx + 1).padStart(4, '0');
      img.src = `/frames/frame-${frameNum}.jpg`;
      img.onload = () => {
        if (idx === 0) {
          setInitialFrameLoaded(true);
          handleResize();
          drawFrame(img);
          lastDrawnFrameRef.current = 0;
        }
        // If playhead is currently close to this keyframe, draw immediately
        if (Math.abs(targetFrameRef.current - idx) <= 15) {
          drawFrame(img);
          lastDrawnFrameRef.current = idx;
        }
      };
      images[idx] = img;
    });

    // Priority 2: Concurrent batch loading of all remaining frames
    let loadedIdx = 1;
    const loadBatch = () => {
      const batchLimit = Math.min(loadedIdx + 30, TOTAL_FRAMES);
      for (let i = loadedIdx; i < batchLimit; i++) {
        if (images[i]) continue;
        const img = new Image();
        const frameNum = String(i + 1).padStart(4, '0');
        img.src = `/frames/frame-${frameNum}.jpg`;
        img.onload = () => {
          // If the playhead is currently waiting for or near this frame, refresh canvas
          if (Math.abs(targetFrameRef.current - i) <= 2) {
            drawFrame(img);
            lastDrawnFrameRef.current = i;
          }
        };
        images[i] = img;
      }
      loadedIdx = batchLimit;
      if (loadedIdx < TOTAL_FRAMES) {
        setTimeout(loadBatch, 15);
      }
    };

    setTimeout(loadBatch, 30);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame, handleResize]);

  // Sync scrollYProgress to target
  useEffect(() => {
    if (prefersReducedMotion) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      targetProgressRef.current = Math.max(0, Math.min(1, latest));
    });

    return () => unsubscribe();
  }, [scrollYProgress, prefersReducedMotion]);

  // Dedicated buttery smooth lerp & canvas render loop with 100% completion plateau
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * 0.20;
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      // Map progress 0 -> 0.82 to frames 0 -> TOTAL_FRAMES - 1
      // From 0.82 to 1.0, hold at frame TOTAL_FRAMES - 1 (100% completion plateau)
      const scrubProgress = Math.min(1, Math.max(0, currentProgressRef.current / 0.82));
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(scrubProgress * (TOTAL_FRAMES - 1)))
      );
      targetFrameRef.current = frameIndex;

      // Update frame counter directly in DOM without triggering React re-renders
      if (frameCounterRef.current) {
        frameCounterRef.current.textContent = String(frameIndex + 1).padStart(3, '0');
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
      }

      // Draw and only mark actualDrawnIndex so it updates as soon as better frame loads
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
  }, [drawFrame, prefersReducedMotion]);

  // Reduced motion alternative: static cinematic frame
  if (prefersReducedMotion) {
    return (
      <section id="hero" className="relative w-full min-h-screen bg-[#171715] text-[#FAF8F4] flex items-center justify-center p-8 sm:p-16">
        <div className="absolute inset-0">
          <img
            src="/frames/frame-0001.jpg"
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
      className="relative w-full h-[200vh] bg-[#171715] text-[#FAF8F4]"
      aria-label="Cinematic Architectural Sequence"
    >
      {/* Pinned Viewport Canvas Stage (100dvh) */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between pb-8">
        {/* HTML5 Canvas for continuous scroll-controlled frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform"
        />

        {/* Fallback poster while frame 1 loads */}
        {!initialFrameLoaded && (
          <img
            src="/frames/frame-0001.jpg"
            alt="Architectural Interior Establishing Shot"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Subtle Ambient Vignettes */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#171715]/85 via-transparent to-[#171715]/45 pointer-events-none"
          aria-hidden="true"
        />

        {/* Dynamic localized scrims behind Stage 2 (Left) and Stage 3 (Right) */}
        <motion.div
          style={{ opacity: leftScrimOpacity }}
          className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-[#171715]/85 via-[#171715]/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          style={{ opacity: rightScrimOpacity }}
          className="absolute inset-y-0 right-0 w-full md:w-3/5 bg-gradient-to-l from-[#171715]/85 via-[#171715]/40 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* TOP STATUS BAR HUD */}
        <div className="relative z-20 pt-20 sm:pt-24 px-6 sm:px-12 md:px-16 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#FAF8F4]/70 pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#9C805B] animate-pulse" />
            <span className="text-[#FAF8F4] font-medium tracking-wider">S.M.S DECORS · ARCHITECTURAL WALKTHROUGH</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#B7AA97]">
              <Compass size={12} className="text-[#9C805B]" weight="bold" />
              <span>FRAME <span ref={frameCounterRef}>001</span> / 240</span>
            </div>
            <span className="text-white/40">|</span>
            <span className="text-[#B7AA97]">CHENNAI ATELIER</span>
          </div>
        </div>

        {/* NARRATIVE STAGE OVERLAYS (EXACT 4 STAGES IN UNIFIED GRID CELL) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 grid grid-cols-1 grid-rows-1 items-center pointer-events-none my-auto">
          {/* ================= STAGE 1: INTRODUCTION (0 – 20%) Centered ================= */}
          <motion.div
            style={{
              opacity: stage1Opacity,
              y: stage1Y,
              pointerEvents: stage1Pointer,
            }}
            className="col-start-1 row-start-1 w-full text-center max-w-3xl mx-auto flex flex-col items-center pointer-events-auto"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#B7AA97] mb-4">
              CRAFTED FOR THE WAY YOU LIVE
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-light tracking-tight text-[#FAF8F4] leading-[1.04]">
              Spaces that speak<span className="text-[#9C805B]">.</span>
            </h1>

            <p className="mt-5 text-base sm:text-xl text-[#FAF8F4]/85 font-light leading-relaxed max-w-xl">
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
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF8F4] text-xs font-medium tracking-[0.18em] uppercase transition-colors"
              >
                <span>START YOUR PROJECT</span>
              </button>
            </div>
          </motion.div>

          {/* ================= STAGE 2: LIVING SPACES (20 – 45%) Left side ================= */}
          <motion.div
            style={{
              opacity: stage2Opacity,
              y: stage2Y,
              pointerEvents: stage2Pointer,
            }}
            className="col-start-1 row-start-1 w-full max-w-xl text-left pointer-events-auto mr-auto"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#9C805B] block mb-3">
              01 / THE ART OF LIVING
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FAF8F4] leading-[1.08]">
              A feeling called home<span className="text-[#9C805B]">.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#FAF8F4]/85 font-light leading-relaxed">
              Thoughtful layouts, tactile materials and considered details come together to create spaces that feel unmistakably yours.
            </p>
          </motion.div>

          {/* ================= STAGE 3: MATERIAL & DETAILS (45 – 75%) Right side ================= */}
          <motion.div
            style={{
              opacity: stage3Opacity,
              y: stage3Y,
              pointerEvents: stage3Pointer,
            }}
            className="col-start-1 row-start-1 w-full max-w-xl ml-auto text-left md:text-right pointer-events-auto"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#9C805B] block mb-3">
              02 / MATERIALS &amp; DETAIL
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#FAF8F4] leading-[1.08]">
              Every detail matters<span className="text-[#9C805B]">.</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-[#FAF8F4]/85 font-light leading-relaxed">
              From warm timber and refined finishes to light, texture and proportion, every element has a purpose.
            </p>
          </motion.div>

          {/* ================= STAGE 4: FINAL CINEMATIC FRAME (75 – 100%) Centered ================= */}
          <motion.div
            style={{
              opacity: stage4Opacity,
              y: stage4Y,
              pointerEvents: stage4Pointer,
            }}
            className="col-start-1 row-start-1 w-full text-center max-w-3xl mx-auto flex flex-col items-center pointer-events-auto"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#B7AA97] mb-4">
              S.M.S DECORS · CHENNAI
            </span>

            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-[#FAF8F4] leading-[1.04]">
              Your vision. Our craft<span className="text-[#9C805B]">.</span>
            </h2>

            <p className="mt-5 text-base sm:text-xl text-[#FAF8F4]/85 font-light leading-relaxed max-w-xl">
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
