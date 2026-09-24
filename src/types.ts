export interface Service {
  id: string;
  title?: string;
  description: string;
  features: string[];
  iconName: string; // Used to dynamic-render Lucide icons
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  url?: string
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface TechBadge {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'testing';
}

export interface  Data {
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    linkedin: string;
    github: string;
    whatsapp: string;
    instagram: string;
    tiktok: string;
  };
  about: string;
}

export type BioLinkActionType = 'whatsapp' | 'anchor' | 'modal' | 'external';

export interface BioLinkItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  highlight?: boolean;
  badge?: string;
  badgeColor?: string;
  type: BioLinkActionType;
  url?: string;
  targetAnchorId?: string;
  whatsappMessage?: string;
}

export interface BioProfileConfig {
  name: string;
  tagline: string;
  handle: string;
  handleUrl: string;
  avatarSrc: string;
  badgeStatus: string;
  location: string;
  phone: string;
  whatsappNumber: string;
  urgencyBanner: {
    enabled: boolean;
    title: string;
    subtitle: string;
    ctaText: string;
    whatsappMessage: string;
  };
}
