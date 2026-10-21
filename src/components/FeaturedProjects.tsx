import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from '@phosphor-icons/react';

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  location: string;
  image: string;
  frameIndex: number;
  description: string;
  attributes: string[];
}

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'living-spaces',
    category: 'Contemporary Living Spaces',
    title: 'Salon & Travertine Hearth Suite',
    location: 'Chennai, Tamil Nadu',
    image: '/frames/frame-0025.jpg',
    frameIndex: 25,
    description:
      'Expansive contemporary living sanctuary articulated with continuous honed stone flooring, recessed 2700K ambient illumination, and bespoke low-slung architectural seating designed for stillness.',
    attributes: ['Honed Travertine', '2700K Warm Cove', 'Acoustic Ceiling Plane'],
  },
  {
    id: 'residential-interiors',
    category: 'Bespoke Residential Interiors',
    title: 'Burma Teak Joinery & Dining Gallery',
    location: 'Chennai, Tamil Nadu',
    image: '/frames/frame-0085.jpg',
    frameIndex: 85,
    description:
      'Handcrafted natural timber millwork framing private residential living zones. Custom seasoned wood credenzas, concealed hardware, and rhythmic fluted wall details.',
    attributes: ['Natural Burma Teak', 'Concealed Joinery', 'Tactile Linseed Finish'],
  },
  {
    id: 'kitchens-dining',
    category: 'Modern Kitchens & Dining Areas',
    title: 'Atrium Dining & Open Culinary Suite',
    location: 'Chennai, Tamil Nadu',
    image: '/frames/frame-0150.jpg',
    frameIndex: 150,
    description:
      'Harmonious spatial transition between active culinary preparation and contemplative dining. High-transparency acoustic glass partitions preserve light across double-height volumes.',
    attributes: ['Fluted Acoustic Glass', 'Monolithic Stone Island', 'Diffused Daylighting'],
  },
  {
    id: 'material-details',
    category: 'Material & Finishing Details',
    title: 'Architectural Details & Patinated Finishes',
    location: 'Chennai, Tamil Nadu',
    image: '/frames/frame-0220.jpg',
    frameIndex: 220,
    description:
      'Macro study in honest materials: patinated muted bronze reveals, hand-rubbed timber grains, and continuous shadow lines calibrated to the half-millimeter.',
    attributes: ['Muted Bronze Patina', 'Shadow Gaps', 'Zero-Glares Cove'],
  },
];

export function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      data-sc-act="projects"
      className="py-28 sm:py-36 md:py-44 bg-[#F3EFE8] text-[#171715] relative overflow-hidden"
      aria-label="Selected Work"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#B7AA97]/30">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#9C805B] block mb-3">
              SELECTED WORK
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#171715] leading-[1.08]">
              Spaces with a point of view<span className="text-[#9C805B]">.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#171715]/75 font-light leading-relaxed">
            Curated architectural studies drawn directly from our studio archive. Each space balances proportions, honest materiality, and spatial clarity.
          </p>
        </div>

        {/* Asymmetric Editorial Portfolio Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Project 1: Contemporary Living Spaces (Span 7 cols) */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 group cursor-pointer"
            onClick={() => setActiveProject(FEATURED_PROJECTS[0])}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#171715]/5 rounded-sm">
              <img
                src={FEATURED_PROJECTS[0].image}
                alt={FEATURED_PROJECTS[0].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#171715]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-5 py-2.5 rounded-full bg-[#FAF8F4] text-[#171715] text-xs font-mono tracking-widest uppercase shadow-md flex items-center gap-2">
                  <span>Inspect Study</span>
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9C805B]">
                  {FEATURED_PROJECTS[0].category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171715] mt-1 group-hover:text-[#9C805B] transition-colors">
                  {FEATURED_PROJECTS[0].title}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#171715]/60 uppercase tracking-widest">
                {FEATURED_PROJECTS[0].location}
              </span>
            </div>
          </motion.article>

          {/* Project 2: Bespoke Residential Interiors (Span 5 cols, offset) */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 md:mt-16 group cursor-pointer"
            onClick={() => setActiveProject(FEATURED_PROJECTS[1])}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#171715]/5 rounded-sm">
              <img
                src={FEATURED_PROJECTS[1].image}
                alt={FEATURED_PROJECTS[1].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#171715]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-5 py-2.5 rounded-full bg-[#FAF8F4] text-[#171715] text-xs font-mono tracking-widest uppercase shadow-md flex items-center gap-2">
                  <span>Inspect Study</span>
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9C805B]">
                {FEATURED_PROJECTS[1].category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171715] mt-1 group-hover:text-[#9C805B] transition-colors">
                {FEATURED_PROJECTS[1].title}
              </h3>
              <span className="text-xs font-mono text-[#171715]/60 uppercase tracking-widest mt-1 block">
                {FEATURED_PROJECTS[1].location}
              </span>
            </div>
          </motion.article>

          {/* Project 3: Modern Kitchens & Dining (Span 5 cols) */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 group cursor-pointer"
            onClick={() => setActiveProject(FEATURED_PROJECTS[2])}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#171715]/5 rounded-sm">
              <img
                src={FEATURED_PROJECTS[2].image}
                alt={FEATURED_PROJECTS[2].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#171715]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-5 py-2.5 rounded-full bg-[#FAF8F4] text-[#171715] text-xs font-mono tracking-widest uppercase shadow-md flex items-center gap-2">
                  <span>Inspect Study</span>
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9C805B]">
                {FEATURED_PROJECTS[2].category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171715] mt-1 group-hover:text-[#9C805B] transition-colors">
                {FEATURED_PROJECTS[2].title}
              </h3>
              <span className="text-xs font-mono text-[#171715]/60 uppercase tracking-widest mt-1 block">
                {FEATURED_PROJECTS[2].location}
              </span>
            </div>
          </motion.article>

          {/* Project 4: Material & Finishing Details (Span 7 cols) */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 md:mt-16 group cursor-pointer"
            onClick={() => setActiveProject(FEATURED_PROJECTS[3])}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#171715]/5 rounded-sm">
              <img
                src={FEATURED_PROJECTS[3].image}
                alt={FEATURED_PROJECTS[3].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#171715]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-5 py-2.5 rounded-full bg-[#FAF8F4] text-[#171715] text-xs font-mono tracking-widest uppercase shadow-md flex items-center gap-2">
                  <span>Inspect Study</span>
                  <ArrowUpRight size={13} weight="bold" />
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9C805B]">
                  {FEATURED_PROJECTS[3].category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171715] mt-1 group-hover:text-[#9C805B] transition-colors">
                  {FEATURED_PROJECTS[3].title}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#171715]/60 uppercase tracking-widest">
                {FEATURED_PROJECTS[3].location}
              </span>
            </div>
          </motion.article>
        </div>
      </div>

      {/* Accessible Architectural Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-[#171715]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl bg-[#F3EFE8] text-[#171715] rounded-none shadow-2xl overflow-hidden border border-[#B7AA97]/40 max-h-[90vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label={activeProject.title}
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 flex items-center justify-between border-b border-[#B7AA97]/25">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9C805B] block">
                    {activeProject.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171715] mt-0.5">
                    {activeProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="w-10 h-10 rounded-full border border-[#171715]/15 flex items-center justify-center text-[#171715] hover:bg-[#171715] hover:text-[#FAF8F4] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#171715]/10">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="md:col-span-2">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#9C805B] mb-2">
                      Spatial Overview
                    </h4>
                    <p className="text-sm sm:text-base text-[#171715]/80 font-light leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#9C805B] mb-2">
                      Material Specification
                    </h4>
                    <ul className="space-y-1.5 text-xs font-mono text-[#171715]/75">
                      {activeProject.attributes.map((attr) => (
                        <li key={attr} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9C805B]" />
                          <span>{attr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
