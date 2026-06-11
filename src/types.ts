/**
 * Shared Type Definitions for the Neo-Brutalist Landing Page
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
  client: string;
  link?: string;
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  tags: string[];
  number: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}
