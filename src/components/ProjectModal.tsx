import { useEffect } from 'react';
import { X, MapPin, CalendarBlank, ArrowsOutSimple, ArrowUpRight } from '@phosphor-icons/react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#171715]/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      {/* Modal Dialog Content Container with Architectural Styling */}
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-none bg-[#F3EFE8] text-[#171715] border border-[#B7AA97]/40 shadow-2xl p-6 sm:p-10 md:p-12 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between border-b border-[#B7AA97]/25 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#171715] text-[#FAF8F4] text-xs font-mono uppercase tracking-widest">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#9C805B] uppercase">
              PROJECT DOSSIER · {project.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#171715]/10 text-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Project Title & Metadata Grid */}
        <div className="mb-8">
          <h2 id="modal-title" className="font-serif text-3xl sm:text-5xl font-light text-[#292A26] leading-tight">
            {project.title}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-xs font-mono uppercase text-[#8A7658]">
            <div className="flex items-center gap-1.5">
              <MapPin size={15} />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarBlank size={15} />
              <span>COMPLETED: {project.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowsOutSimple size={15} />
              <span>FLOOR AREA: {project.area}</span>
            </div>
          </div>
        </div>

        {/* Featured Visual */}
        <div className="relative h-[340px] sm:h-[460px] w-full rounded-[1.8rem] overflow-hidden mb-8 shadow-md">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Narrative & Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 py-6 border-y border-[#8A7658]/20">
          <div className="md:col-span-7">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#8A7658] mb-3">
              ARCHITECTURAL NARRATIVE
            </h3>
            <p className="text-base text-[#292A26]/85 font-light leading-relaxed">
              {project.description}
            </p>

            <div className="mt-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#8A7658] mb-3">
                MATERIAL PALETTE
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((m) => (
                  <span
                    key={m}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-[#8A7658]/20 text-xs text-[#292A26] font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-white/70 p-6 rounded-[1.6rem] border border-[#8A7658]/20 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#8A7658] mb-4">
                ENGINEERING &amp; CRAFT SCOPE
              </h4>
              <ul className="space-y-2.5 text-xs text-[#292A26]/80 font-light">
                {project.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#8A7658] font-mono mt-0.5">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="mt-8 w-full py-3.5 rounded-full bg-[#171715] text-[#FAF8F4] hover:bg-[#9C805B] transition-colors text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span>INQUIRE ABOUT THIS PROJECT</span>
              <ArrowUpRight size={14} weight="bold" />
            </button>
          </div>
        </div>

        {/* Additional Gallery Photos if available */}
        {project.galleryImages.length > 0 && (
          <div className="mt-8">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#8A7658] mb-4">
              SPATIAL PERSPECTIVES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.galleryImages.map((img, idx) => (
                <div key={idx} className="h-44 sm:h-52 rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={img}
                    alt={`${project.title} perspective ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
