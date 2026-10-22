import { useState, useCallback, useEffect } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MaskedRevealSection } from './components/MaskedRevealSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { PinnedStorytelling } from './components/PinnedStorytelling';
import { HorizontalPortfolio } from './components/HorizontalPortfolio';
import { DesignPhilosophy } from './components/DesignPhilosophy';
import { ArchitecturalImageBand } from './components/ArchitecturalImageBand';
import { OurProcess } from './components/OurProcess';
import { SignatureMaterialLens } from './components/SignatureMaterialLens';
import { AboutHeritage } from './components/AboutHeritage';
import { ClientsMarquee } from './components/ClientsMarquee';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import type { Project } from './types';
import { useLenis } from './hooks/useLenis';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export function App() {
  const [, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryService, setInquiryService] = useState<string>('Bespoke Residential Interior');
  const prefersReducedMotion = usePrefersReducedMotion();

  // Lenis smooth scroll
  useLenis(prefersReducedMotion);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
    document.documentElement.classList.add('sc-ready');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add('sc-ready');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenisInstance) {
        window.__lenisInstance.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExploreWork = () => scrollToSection('projects');
  const handleDiscussProject = () => scrollToSection('contact');

  const handleInquireFromModal = (projectTitle: string) => {
    setInquiryService(`Inquiry regarding: ${projectTitle}`);
    scrollToSection('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#F3EFE8] text-[#171715] selection:bg-[#9C805B] selection:text-[#FAF8F4] overflow-x-clip">
      {/* Subtle Architectural Film Grain Texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Editorial Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Fixed Architectural Navigation */}
      <Navbar onOpenContact={handleDiscussProject} />

      <main className="w-full">
        {/* Section 3: Cinematic Scroll-Controlled Canvas Hero */}
        <Hero
          onExploreWork={handleExploreWork}
          onDiscussProject={handleDiscussProject}
        />

        {/* Key Effect #1: Spatial Transformation Lens & Metamorphosis Reveal */}
        <MaskedRevealSection />

        {/* Section 6: Featured Projects Section (Selected Work) */}
        <FeaturedProjects />

        {/* Key Effect #2: Pinned Craft Storytelling & Material Anatomy */}
        <PinnedStorytelling />

        {/* Key Effect #3: Horizontal Pinned Architectural Dossier */}
        <HorizontalPortfolio onSelectProject={setSelectedProject} />

        {/* Section 7: Design Philosophy Section (Our Approach) */}
        <DesignPhilosophy />

        {/* Section 8: Full-Width Architectural Image Band with Parallax */}
        <ArchitecturalImageBand />

        {/* Section 9: Our Process Section */}
        <OurProcess />

        {/* Signature Move: Architectural Material Spec-Lens */}
        <SignatureMaterialLens />

        {/* Atelier Heritage (Established 2015 in Chennai) */}
        <AboutHeritage />

        {/* Verified Client & Institutional Roster Marquee */}
        <ClientsMarquee />

        {/* Section 10: Final Contact Section */}
        <ContactSection initialService={inquiryService} />
      </main>

      {/* Section 11: Minimal Footer */}
      <Footer />

      {/* Interactive Project Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireFromModal}
      />
    </div>
  );
}

export default App;
