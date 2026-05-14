// ══════════════════════════════════════════════════════════════
// TYPES CONTENU — Sections & Composants
// ══════════════════════════════════════════════════════════════

/**
 * Structure de base pour toute section de page.
 * Toutes les sections héritent de ce type.
 */
export interface BaseSection {
  id?: string;           // Ancre HTML (ex: #services)
  className?: string;
  visible?: boolean;     // Permet de cacher une section sans la supprimer
}

// ──────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────

export interface NavItem {
  label: string;         // Clé i18n ou texte direct
  href: string;
  children?: NavItem[];  // Pour les dropdowns
  external?: boolean;
  highlight?: boolean;   // Mettre en évidence (ex: "Contact")
}

export interface NavConfig {
  logo: {
    text: string;
    href: string;
    imageSrc?: string;
  };
  items: NavItem[];
  cta?: {
    label: string;
    href: string;
    variant: 'primary' | 'outline' | 'ghost';
  };
}

// ──────────────────────────────────────
// HERO SECTION
// ──────────────────────────────────────

export interface HeroContent extends BaseSection {
  badge?: string;        // Ex: "Cabinet certifié ISO 9001"
  headline: string;
  subheadline?: string;
  description?: string;
  primaryCta: CtaButton;
  secondaryCta?: CtaButton;
  image?: MediaAsset;
  video?: VideoAsset;
  stats?: StatItem[];    // Chiffres clés sous le hero
}

export interface CtaButton {
  label: string;
  href: string;
  icon?: string;         // Nom d'icône Lucide
  /** 'whatsapp' déclenche l'ouverture WhatsApp au lieu de navigation */
  action?: 'navigate' | 'whatsapp' | 'scroll' | 'modal';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;    // next/image priority pour LCP
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;  // Base64 pour blur placeholder
}

export interface VideoAsset {
  src: string;
  poster: string;        // Image de fallback (critique connexions lentes)
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

// ──────────────────────────────────────
// SERVICES
// ──────────────────────────────────────

export interface Service {
  id: string;
  slug: string;
  icon?: string;         // Nom d'icône Lucide
  image?: MediaAsset;
  title: string;
  description: string;
  features?: string[];
  cta?: CtaButton;
  price?: string;
  badge?: string;        // "Populaire", "Nouveau", etc.
  category?: string;
}

// ──────────────────────────────────────
// ÉQUIPE
// ──────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: MediaAsset;
  specialties?: string[];  // Pour template santé
  socialLinks?: SocialLink[];
  whatsapp?: string;
  email?: string;
  certifications?: string[];
}

// ──────────────────────────────────────
// TÉMOIGNAGES
// ──────────────────────────────────────

export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    company?: string;
    image?: MediaAsset;
    location?: string;   // Ex: "Yaoundé, Cameroun"
  };
  rating?: 1 | 2 | 3 | 4 | 5;
  date?: string;
}

// ──────────────────────────────────────
// STATS / CHIFFRES CLÉS
// ──────────────────────────────────────

export interface StatItem {
  value: number | string;
  suffix?: string;       // Ex: "+", "k", "%", " ans"
  label: string;
  icon?: string;
  description?: string;
}

// ──────────────────────────────────────
// GALERIE
// ──────────────────────────────────────

export interface GalleryItem {
  id: string;
  image: MediaAsset;
  title?: string;
  description?: string;
  category?: string;
}

// ──────────────────────────────────────
// FAQ
// ──────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// ──────────────────────────────────────
// PROPRIÉTÉS IMMOBILIÈRES
// ──────────────────────────────────────

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: 'XAF' | 'EUR' | 'USD';
  priceType: 'sale' | 'rent' | 'rent-per-month';
  type: 'apartment' | 'house' | 'land' | 'commercial' | 'villa';
  status: 'available' | 'reserved' | 'sold';
  address: {
    neighborhood: string;  // Quartier (ex: Bastos, Bonanjo)
    city: string;
    country: string;
  };
  specs: {
    area: number;        // m²
    bedrooms?: number;
    bathrooms?: number;
    floors?: number;
    parking?: boolean;
    furnished?: boolean;
  };
  images: MediaAsset[];
  features: string[];
  agent?: TeamMember;
  featured?: boolean;
  badge?: string;        // "Coup de cœur", "Nouveau", "Vue panoramique"
}

// ──────────────────────────────────────
// MENU RESTAURANT / LIFESTYLE
// ──────────────────────────────────────

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'XAF' | 'EUR';
  category: string;
  image?: MediaAsset;
  allergens?: string[];
  badge?: string;        // "Chef recommande", "Végétarien", etc.
  available?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
}

// Re-export pour éviter les imports circulaires
export type { SocialLink } from './template';
