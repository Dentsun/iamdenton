import { ReactNode } from 'react';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  content: ReactNode;
  icon?: string;
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
}

export interface AppData {
  id: string;
  title: string;
  icon: any; // React Icon component
  component: ReactNode;
  isExternal?: boolean;
  url?: string;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  dates: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  link?: string;
}

export interface Education {
  school: string;
  degree: string;
  location: string;
  date: string;
  details: string[];
}

export interface Skill {
  name: string;
  icon: string;
  years: string;
  category: 'Languages' | 'Backend' | 'Cloud/DevOps' | 'Data' | 'Frontend';
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  location: string;
}
