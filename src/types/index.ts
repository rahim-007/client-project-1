export type ProjectCategory = 'All' | 'Residential' | 'Commercial' | 'Renovation';

export interface Project {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Renovation';
  location: string;
  year: string;
  area: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  scope: string[];
  materials: string[];
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  deliverables: string[];
  tag: string;
}

export interface ClientPartner {
  id: string;
  name: string;
  category: 'Education' | 'Corporate' | 'Engineering' | 'Manufacturing';
  location: string;
}
