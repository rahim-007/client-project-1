import type { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'res-walnut-living',
    title: 'The Brick & Walnut Living Suite',
    category: 'Residential',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    area: '3,800 sq.ft',
    coverImage: '/projects/residential/walnut-living.png',
    galleryImages: [
      '/projects/residential/brick-console.png',
      '/projects/residential/timber-corridor.png'
    ],
    description: 'Bespoke private residential interior featuring book-matched walnut veneer wall cladding, custom frameless glass corner curio display, exposed brick TV accent wall, and imported Italian marble flooring.',
    scope: ['Living Room Millwork', 'Exposed Brick Feature Wall', 'Frameless Glass Cabinetry', 'Marble Flooring Alignment'],
    materials: ['Book-Matched Walnut Veneer', 'Exposed Terracotta Brick', 'Frameless Float Glass', 'Polished Italian Marble'],
    featured: true
  },
  {
    id: 'com-munoth-jain',
    title: 'Munoth Jain Medical Care & Guest House',
    category: 'Commercial',
    location: 'Thorapakkam, Chennai',
    year: '2024',
    area: '7,500 sq.ft',
    coverImage: '/projects/commercial/munoth-medical-facade.png',
    galleryImages: [
      '/projects/commercial/guest-house-portal.png',
      '/projects/commercial/clinic-reception.png',
      '/projects/commercial/diagnostics-workstations.png'
    ],
    description: 'Complete exterior and interior institutional architecture for Lalchand Lee Lucky Munoth Jain Medical Care and guest house facilities, featuring vibrant ACP facade cladding, custom reception desk with glass counter, consultation suites, and covered portico.',
    scope: ['Architectural Facade Cladding', 'Turnkey Clinic Interiors', 'Reception & Waiting Lounge', 'Covered Driveway Portico'],
    materials: ['Blue & White ACP Panels', 'Architectural Toughened Glass', 'Granite Gate Pillars', 'Wood-Grain Resilient Flooring'],
    featured: true
  },
  {
    id: 'ren-rooftop-transformation',
    title: 'Rooftop Structural Hall Transformation',
    category: 'Renovation',
    location: 'Perungudi, Chennai',
    year: '2024',
    area: '2,400 sq.ft',
    coverImage: '/projects/renovation/after.png',
    galleryImages: [
      '/projects/renovation/before.jpg'
    ],
    description: 'Metamorphosis of a raw industrial rooftop structural framework into a climate-controlled executive multipurpose hall. Features dual-tier coffered false ceilings with warm yellow and blue indirect LED coves, precision electrical ducting, and engineered wood flooring.',
    scope: ['Structural Shell Enclosure', 'Dual-Tier False Ceiling', 'HVAC & Lighting Integration', 'Engineered Flooring Installation'],
    materials: ['Gypsum Acoustic Ceiling', 'Dual-Color LED Profile Coves', 'Anodized Aluminum Windows', 'Engineered Hardwood'],
    featured: true
  },
  {
    id: 'com-corporate-workspace',
    title: 'Corporate Operations Facility',
    category: 'Commercial',
    location: 'OMR IT Corridor, Chennai',
    year: '2023',
    area: '6,800 sq.ft',
    coverImage: '/projects/commercial/corporate-cubicles.png',
    galleryImages: [
      '/projects/commercial/diagnostics-workstations.png'
    ],
    description: 'Modern modular office workspace layout engineered for high productivity, featuring acoustic fabric-wrapped burgundy privacy screens, beechwood veneer workstations with integrated wire management, and frosted glass meeting cabins.',
    scope: ['Modular Workstation Fitout', 'Acoustic Screen Partitioning', 'Linear HVAC Coordination', 'Glass Cabin Enclosures'],
    materials: ['Burgundy Acoustic Fabric', 'Beechwood Veneer Laminate', 'Anodized Aluminum Frame', 'Frosted Architectural Glass'],
    featured: true
  },
  {
    id: 'res-brick-study',
    title: 'Exposed Brick Study Alcove',
    category: 'Residential',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    area: '1,800 sq.ft',
    coverImage: '/projects/residential/brick-console.png',
    galleryImages: [
      '/projects/residential/walnut-living.png'
    ],
    description: 'Tactile study and console nook anchored by an exposed wirecut brick masonry wall with warm raking downlights, a live-edge solid hardwood floating console with wrought iron supports, and tall handcrafted glazed display cabinetry.',
    scope: ['Feature Wall Masonry', 'Live-Edge Joinery', 'Display Cabinet Fabrication', 'Targeted Task Illumination'],
    materials: ['Wirecut Terracotta Brick', 'Solid Hardwood Live-Edge Slab', 'Wrought Iron Supports', 'Polished Natural Stone'],
    featured: false
  },
  {
    id: 'ren-timber-corridor',
    title: 'Architectural Ceiling & Lighting Corridor',
    category: 'Renovation',
    location: 'Chennai, Tamil Nadu',
    year: '2024',
    area: '1,200 sq.ft',
    coverImage: '/projects/residential/timber-corridor.png',
    galleryImages: [
      '/projects/residential/walnut-living.png'
    ],
    description: 'Ceiling architecture study highlighting custom dark walnut timber coffering with rhythmically recessed transversal warm LED profiles, perimeter wall-washing, and geometric pendant lantern fixtures.',
    scope: ['Custom Timber Ceiling Coffering', 'Recessed Profile Lighting', 'Perimeter Wall Grazing', 'Corridor Architectural Detailing'],
    materials: ['Dark Walnut Wood Paneling', 'Extruded Aluminum LED Profiles', 'Warm 3000K Lighting', 'Low-VOC Matte Paint'],
    featured: false
  }
];
