import type { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'interior-works',
    number: '01',
    title: 'Bespoke Interior Architecture',
    subtitle: 'From conceptual spatial layouts to comprehensive turnkey execution',
    description: 'We orchestrate residential and commercial spaces defined by proportional balance, natural illumination, and tailored millwork. Every layout is calibrated for modern living and operational clarity.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    deliverables: [
      'Comprehensive Space Planning & Layout Architecture',
      'Bespoke Cabinetry, Wardrobes & Concealed Storage',
      'Modular Kitchen Engineering & Ergonomic Worktriangles',
      'Architectural Illumination Schemes & Cove Detailing'
    ],
    tag: 'Primary Discipline'
  },
  {
    id: 'complete-renovation',
    number: '02',
    title: 'Complete Spatial Renovation',
    subtitle: 'Transforming aging structures into timeless, high-performance environments',
    description: 'Specializing in the revival of aging residential apartments, independent villas, and institutional complexes across Chennai. We re-engineer structural flows, update utilities, and restore material integrity.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    deliverables: [
      'Structural Wall Reconfiguration & Flow Optimization',
      'Comprehensive Plumbing & MEP Modernization',
      'Floor Surface Restoration & Honed Stone Laying',
      'Thermal, Waterproofing & Acoustic Insulation'
    ],
    tag: 'Turnkey Expertise'
  },
  {
    id: 'modular-solutions',
    number: '03',
    title: 'Modular Systems & Precision Carpentry',
    subtitle: 'Precision joinery crafted for functional endurance and sensory warmth',
    description: 'Engineered in close collaboration with Chennai’s master woodworkers. Utilizing marine-grade ply, natural architectural veneers, and concealed German hardware for seamless tactile operation.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
    deliverables: [
      'Precision Marine-Ply Carcasses & Acrylic Facades',
      'Integrated Concealed Hinges & Soft-Close Kinetic Runners',
      'Custom Fluted Paneling & Acoustic Timber Slat Walls',
      'Natural Teak & Oak Surface Finishes'
    ],
    tag: 'Master Joinery'
  },
  {
    id: 'ceiling-electrical',
    number: '04',
    title: 'Ceiling Works & Precision Electrical',
    subtitle: 'Integrated acoustic gypsum planes and architectural lighting infrastructure',
    description: 'Refined false ceiling designs that conceal MEP services while establishing ambient mood layers. Fully compliant with modern energy efficiency and safety standards.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    deliverables: [
      'Seamless Gypsum Drywall & Peripheral Cove Profiles',
      'Acoustic Baffle Panels for Auditoriums & Boardrooms',
      'Concealed Wiring & Dedicated Circuit Protection',
      'Architectural 2700K Warm Dimming & Smart Controls'
    ],
    tag: 'Technical Infrastructure'
  }
];
