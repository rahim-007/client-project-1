import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, SquaresFour, Slideshow } from '@phosphor-icons/react';
import { PROJECTS_DATA } from '../data/projects';
import type { Project, ProjectCategory } from '../types';

interface HorizontalPortfolioProps {
  onSelectProject: (project: Project) => void;
}

export function HorizontalPortfolio({ onSelectProject }: HorizontalPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
    } else {
      setScrollProgress(0);
    }
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -480 : 480;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStartRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftStartRef.current - walk;
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setScrollProgress(0);
    }
  }, [selectedCategory]);

  const categories: ProjectCategory[] = ['All', 'Residential', 'Commercial', 'Renovation'];

  return (
    <section
      id="portfolio"
      data-sc-act="horizontal-portfolio"
      className="pt-16 sm:pt-20 pb-20 sm:pb-24 bg-[#F3EFE8] text-[#171715] relative border-t border-[#B7AA97]/25"
      aria-label="Selected Spatial Works"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mb-10 sm:mb-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#B7AA97]/25 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#7F6847] block mb-3">
              SPATIAL DOSSIER · SELECTED PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#171715] leading-[1.08]">
              Selected Architectural Works<span className="text-[#7F6847]">.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#171715]/90 font-light max-w-xl leading-relaxed">
              A curated catalog of completed residences, workplace environments, and structural renovations across Chennai.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#171715] text-[#FAF8F4] shadow-sm'
                    : 'bg-[#FAF8F4] text-[#171715]/80 hover:bg-white border border-[#B7AA97]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Bar for Manual Navigation & View Switcher */}
        <div className="flex items-center justify-between mt-6 text-xs font-mono uppercase tracking-widest text-[#7F6847]">
          <div className="flex items-center gap-3">
            <span className="text-[#171715] font-semibold">{filteredProjects.length} CURATED PROJECTS</span>
            <span className="hidden sm:inline text-[#B7AA97]">· CHENNAI ATELIER</span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Slider vs Grid */}
            <div className="hidden sm:flex items-center p-0.5 rounded-full bg-[#FAF8F4] border border-[#B7AA97]/30 text-xs">
              <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                  viewMode === 'slider'
                    ? 'bg-[#171715] text-[#FAF8F4]'
                    : 'text-[#171715]/70 hover:text-[#171715]'
                }`}
                title="Slider View"
              >
                <Slideshow size={13} />
                <span>Slider</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#171715] text-[#FAF8F4]'
                    : 'text-[#171715]/70 hover:text-[#171715]'
                }`}
                title="Grid View"
              >
                <SquaresFour size={13} />
                <span>Grid</span>
              </button>
            </div>

            {/* Navigation Arrows for Slider Mode */}
            {viewMode === 'slider' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleManualScroll('left')}
                  className="w-10 h-10 rounded-full border border-[#B7AA97]/40 flex items-center justify-center hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors bg-[#FAF8F4]"
                  aria-label="Scroll left"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => handleManualScroll('right')}
                  className="w-10 h-10 rounded-full border border-[#B7AA97]/40 flex items-center justify-center hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors bg-[#FAF8F4]"
                  aria-label="Scroll right"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: Smooth Horizontal Slider (No scroll hijacking, no locking) */}
      {viewMode === 'slider' ? (
        <div>
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="w-full overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-12 md:px-16 cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex items-stretch gap-6 sm:gap-8 pb-4 min-w-max">
              {filteredProjects.map((project, idx) => (
                <article
                  key={project.id}
                  className="w-[320px] sm:w-[420px] md:w-[480px] group flex flex-col justify-between bg-[#FAF8F4] border border-[#B7AA97]/30 p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#7F6847] cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  {/* Image Frame with Subtle Zoom on Hover */}
                  <div className="relative h-[240px] sm:h-[300px] md:h-[340px] w-full overflow-hidden bg-[#171715]">
                    <img
                      src={project.coverImage}
                      alt={`${project.title} - ${project.category} project in ${project.location}`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 pointer-events-none"
                      loading="lazy"
                    />

                    {/* Badges on Top */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#171715]/85 backdrop-blur-md text-[#FAF8F4] text-[10px] font-mono tracking-widest uppercase">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#171715] text-[10px] font-mono tracking-widest uppercase">
                        {project.year}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#171715]/80 text-[#FAF8F4] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                      <ArrowUpRight size={14} weight="bold" />
                    </div>

                    {/* Bottom Overlay Info */}
                    <div className="absolute bottom-3 left-3 right-3 bg-[#171715]/85 backdrop-blur-md text-[#FAF8F4] px-3.5 py-2 flex items-center justify-between text-xs font-mono">
                      <span>{project.location}</span>
                      <span className="text-[#7F6847]">{project.area}</span>
                    </div>
                  </div>

                  {/* Card Meta & Typography */}
                  <div className="mt-4 px-1 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#7F6847] uppercase mb-1">
                        <span>CATALOG ITEM 0{idx + 1}</span>
                        <span>CHENNAI</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-[#171715] group-hover:text-[#7F6847] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#171715]/90 font-light line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Materials & Inspect Action */}
                    <div className="mt-4 pt-3.5 border-t border-[#B7AA97]/25 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {project.materials.slice(0, 2).map((m) => (
                          <span
                            key={m}
                            className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#B7AA97]/20 text-[#171715]"
                          >
                            {m}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#7F6847] hover:text-[#171715] transition-colors font-medium"
                      >
                        <span>INSPECT</span>
                        <ArrowUpRight size={13} weight="bold" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Understated Progress Bar Track */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 mt-4">
            <div className="w-full h-1 bg-[#B7AA97]/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7F6847] transition-all duration-100 ease-out"
                style={{ width: `${Math.max(15, Math.round(scrollProgress * 100))}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: Comprehensive Architectural Grid */
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                className="group flex flex-col justify-between bg-[#FAF8F4] border border-[#B7AA97]/30 p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#7F6847] cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <div className="relative h-[220px] sm:h-[260px] w-full overflow-hidden bg-[#171715]">
                  <img
                    src={project.coverImage}
                    alt={`${project.title} - ${project.category} project in ${project.location}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#171715]/85 backdrop-blur-md text-[#FAF8F4] text-[10px] font-mono tracking-widest uppercase">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#171715] text-[10px] font-mono tracking-widest uppercase">
                      {project.year}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#171715]/80 text-[#FAF8F4] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <ArrowUpRight size={14} weight="bold" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-[#171715]/85 backdrop-blur-md text-[#FAF8F4] px-3.5 py-2 flex items-center justify-between text-xs font-mono">
                    <span>{project.location}</span>
                    <span className="text-[#7F6847]">{project.area}</span>
                  </div>
                </div>

                <div className="mt-4 px-1 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#7F6847] uppercase mb-1">
                      <span>CATALOG ITEM 0{idx + 1}</span>
                      <span>CHENNAI</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-light text-[#171715] group-hover:text-[#7F6847] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#171715]/90 font-light line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-[#B7AA97]/25 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.materials.slice(0, 2).map((m) => (
                        <span
                          key={m}
                          className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#B7AA97]/20 text-[#171715]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#7F6847] hover:text-[#171715] transition-colors font-medium"
                    >
                      <span>INSPECT</span>
                      <ArrowUpRight size={13} weight="bold" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
