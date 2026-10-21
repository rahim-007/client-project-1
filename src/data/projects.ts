import type { Project } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'res-neelankarai',
    title: 'The Neelankarai Residence',
    category: 'Residential',
    location: 'East Coast Road, Chennai',
    year: '2024',
    area: '4,200 sq.ft',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A contemporary coastal living sanctuary designed with warm ivory micro-plaster, open-grain teak joinery, and floor-to-ceiling filtered natural illumination.',
    scope: ['Full Interior Execution', 'Custom Teak Millwork', 'Acoustic Ceilings', 'Mood Illumination'],
    materials: ['Honed Travertine', 'Natural Burma Teak', 'Muted Bronze Hardware', 'Lime Wash Plaster'],
    featured: true
  },
  {
    id: 'com-omr-headquarters',
    title: 'OMR Technology Atelier',
    category: 'Commercial',
    location: 'Old Mahabalipuram Road, Chennai',
    year: '2023',
    area: '8,500 sq.ft',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Minimalist corporate environment combining open collaborative pods, acoustic micro-perforated ceiling baffles, and private meeting suites.',
    scope: ['Turnkey Commercial Interiors', 'Acoustic Ceiling Works', 'Modular Partitioning', 'HVAC Coordination'],
    materials: ['Charcoal Anodized Aluminum', 'Soft Sage Acoustic Felt', 'Tempered Fluted Glass', 'Engineered Oak'],
    featured: true
  },
  {
    id: 'ren-adyar-penthouse',
    title: 'Adyar Riverbank Penthouse',
    category: 'Renovation',
    location: 'Adyar, Chennai',
    year: '2024',
    area: '3,800 sq.ft',
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A comprehensive structural and aesthetic renovation of a 15-year-old apartment. Partition walls were selectively re-engineered to double cross-ventilation and natural river views.',
    scope: ['Complete Renovation', 'MEP Overhaul', 'Custom Kitchen Island', 'Precision Carpentry'],
    materials: ['Italian Botticino Marble', 'Smoked Walnut Veneer', 'Brushed Brass', 'Micro-Cement'],
    featured: true
  },
  {
    id: 'res-besant-nagar',
    title: 'Besant Nagar Courtyard Villa',
    category: 'Residential',
    location: 'Besant Nagar, Chennai',
    year: '2023',
    area: '5,100 sq.ft',
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A serene architectural sanctuary built around an open-air central water courtyard with handcrafted timber louvers and bespoke stone finishes.',
    scope: ['Interior Architecture', 'Courtyard Joinery', 'Wardrobe Suites', 'Smart Lighting'],
    materials: ['Kadappa Stone', 'Reclaimed Teakwood', 'Terracotta Louvers', 'Brushed Steel'],
    featured: false
  },
  {
    id: 'ren-alwarpet-heritage',
    title: 'Alwarpet Studio Restoration',
    category: 'Renovation',
    location: 'Alwarpet, Chennai',
    year: '2023',
    area: '2,900 sq.ft',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Rehabilitation of an aging traditional residential structure into a serene, light-filled creative atelier and guest residence.',
    scope: ['Heritage Restoration', 'Roof Timber Refurbishment', 'Modern Bathroom Additions', 'Electrical Retrofit'],
    materials: ['Athangudi Heritage Tiles', 'Exposed Brick Lime Mortar', 'Cast Iron Accents', 'Teak Beams'],
    featured: false
  },
  {
    id: 'com-perungudi-corporate',
    title: 'Perungudi Executive Suite',
    category: 'Commercial',
    location: 'Perungudi, Chennai',
    year: '2024',
    area: '6,200 sq.ft',
    coverImage: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Corporate leadership suite designed with acoustic privacy, seamless fluted wall paneling, and discreet presentation technology integration.',
    scope: ['Executive Suite Design', 'Acoustic Partitions', 'Custom Boardroom Table', 'Automated Shades'],
    materials: ['Fluted White Ash', 'Nero Marquina Marble', 'Acoustic Kvadrat Fabric', 'Architectural Glass'],
    featured: true
  }
];
