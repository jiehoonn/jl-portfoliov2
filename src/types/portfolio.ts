// Navigation types
export interface NavigationItem {
  href: string;
  label: string;
}

// Skill types
export interface Skill {
  name: string;
  icon: string;
}

// Contact types
export interface ContactLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

// Model Info section types
export interface SectionContent {
  title: string;
  items: string[];
}

export interface ExperienceDetails {
  [key: string]: string;
}

export interface ProjectDetails {
  [key: string]: string;
}

// Animation types
export interface ScrollPosition {
  current: number;
  previous: number;
  direction: 'up' | 'down';
}

// Layout types
export interface LayoutProps {
  children: React.ReactNode;
}

// Component state types
export interface MenuState {
  isOpen: boolean;
  activeItem: string | null;
}

export interface WindowDimensions {
  width: number;
  height: number;
}

