export interface NavigationItem {
  href: string;
  label: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface ContactLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

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

export interface WindowDimensions {
  width: number;
  height: number;
}

