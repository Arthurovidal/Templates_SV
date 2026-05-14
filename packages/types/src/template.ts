// ══════════════════════════════════════════════════════════════
// TYPES TEMPLATE — Configuration & Thème
// ══════════════════════════════════════════════════════════════

/**
 * Identifiants uniques des 4 templates.
 * Utilisé pour le theming, les messages i18n, et la config.
 */
export type TemplateId = 'corporate' | 'sante' | 'immobilier' | 'lifestyle';

/**
 * Locales supportées par tous les templates
 */
export type Locale = 'fr' | 'en';

/**
 * Configuration visuelle d'un template.
 * Les valeurs correspondent aux CSS Variables définies dans globals.css
 */
export interface ThemeConfig {
  id: TemplateId;

  /** Palette de couleurs principale */
  colors: {
    background: string;       // --color-background
    foreground: string;       // --color-foreground
    primary: string;          // --color-primary
    primaryForeground: string;
    accent: string;           // --color-accent
    accentForeground: string;
    muted: string;            // --color-muted
    mutedForeground: string;
    border: string;           // --color-border
    card: string;             // --color-card
    cardForeground: string;
  };

  /** Configuration typographique */
  fonts: {
    display: string;   // Titre H1/H2 — Playfair, Cormorant, Bebas, etc.
    body: string;      // Corps de texte — Inter, Plus Jakarta, Lato, etc.
    mono: string;      // Code — JetBrains Mono
  };

  /** Border radius par composant */
  radii: {
    sm: string;
    md: string;
    lg: string;
    card: string;
  };

  /** Features actives/inactives pour ce template */
  features: FeatureFlags;
}

/**
 * Feature flags par template.
 * Permet d'activer/désactiver des sections entières sans supprimer le code.
 */
export interface FeatureFlags {
  whatsapp: boolean;          // Bouton WhatsApp flottant
  contactForm: boolean;       // Formulaire de contact avec email
  gallery: boolean;           // Section galerie d'images
  map: boolean;               // Carte Leaflet (localisation)
  testimonials: boolean;      // Section témoignages
  team: boolean;              // Section équipe
  stats: boolean;             // Compteurs animés (clients, années, etc.)
  newsletter: boolean;        // Formulaire newsletter (V2)
  multiLanguage: boolean;     // Switcher FR/EN
  darkMode: boolean;          // Toggle dark/light mode
}

/**
 * Configuration complète d'un template.
 * Chaque app/*/lib/config.ts exporte une instance de ce type.
 */
export interface TemplateConfig {
  id: TemplateId;
  theme: ThemeConfig;
  seo: SeoConfig;
  contact: ContactConfig;
  whatsapp: WhatsAppConfig;
}

// ══════════════════════════════════════════════════════════════
// TYPES SEO
// ══════════════════════════════════════════════════════════════

export interface SeoConfig {
  siteName: string;
  siteUrl: string;
  defaultLocale: Locale;
  twitterHandle?: string;
  googleAnalyticsId?: string;

  /** Données pour Schema.org LocalBusiness */
  business: BusinessSchema;
}

export interface BusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: AddressSchema;
  geo?: GeoSchema;
  openingHours?: string[];
  /** Type Schema.org */
  type:
    | 'LocalBusiness'
    | 'MedicalOrganization'
    | 'RealEstateAgent'
    | 'Restaurant'
    | 'LegalService'
    | 'FinancialService';
  priceRange?: string;    // "FCFA", "$$", etc.
  servesCuisine?: string; // Pour Restaurant
  specialty?: string;     // Pour MedicalOrganization
}

export interface AddressSchema {
  streetAddress: string;
  addressLocality: string;    // Ville (ex: Yaoundé)
  addressRegion: string;      // Région (ex: Centre)
  addressCountry: string;     // Code ISO (ex: CM)
  postalCode?: string;
}

export interface GeoSchema {
  latitude: number;
  longitude: number;
}

// ══════════════════════════════════════════════════════════════
// TYPES CONTACT & WHATSAPP
// ══════════════════════════════════════════════════════════════

export interface ContactConfig {
  email: string;
  phone: string;
  address: AddressSchema;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok';
  url: string;
  label: string;
}

export interface WhatsAppConfig {
  /** Numéro sans le + (ex: 237699000000) */
  number: string;
  /** Message pré-rempli en français */
  messageFr: string;
  /** Message pré-rempli en anglais */
  messageEn: string;
  /** Afficher le bouton flottant */
  showFloatingButton: boolean;
}
