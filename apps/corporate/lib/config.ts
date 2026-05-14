import type { SeoConfig, WhatsAppConfig, TemplateConfig } from '@template/types';

// ──────────────────────────────────────
// SEO CONFIG
// ──────────────────────────────────────

export const corporateSeoConfig: SeoConfig = {
  siteName: process.env['NEXT_PUBLIC_CORPORATE_SITE_NAME'] ?? 'Dupont & Associés',
  siteUrl:
    process.env['NEXT_PUBLIC_CORPORATE_SITE_URL'] ?? 'http://localhost:3001',
  defaultLocale: 'fr',

  business: {
    name: 'Dupont & Associés — Cabinet d\'Avocats',
    description:
      'Cabinet d\'avocats spécialisé en droit des affaires, fiscal et social. Expertise OHADA reconnue. Basé à Yaoundé, Cameroun.',
    url: process.env['NEXT_PUBLIC_CORPORATE_SITE_URL'] ?? 'http://localhost:3001',
    telephone: '+237 222 00 00 00',
    email: 'contact@dupont-associes.cm',
    type: 'LegalService',
    priceRange: 'FCFA',

    address: {
      streetAddress: 'Avenue Kennedy, Bastos, Immeuble Le Parc, 3ème étage',
      addressLocality: 'Yaoundé',
      addressRegion: 'Centre',
      addressCountry: 'CM',
      postalCode: 'BP 1234',
    },

    geo: {
      latitude: 3.8664,
      longitude: 11.5167,
    },

    openingHours: [
      'Mo-Fr 08:00-18:00',
      'Sa 09:00-13:00',
    ],
  },
};

// ──────────────────────────────────────
// WHATSAPP CONFIG
// ──────────────────────────────────────

export const corporateWhatsAppConfig: WhatsAppConfig = {
  number: process.env['NEXT_PUBLIC_CORPORATE_WHATSAPP'] ?? '237699000001',
  messageFr:
    'Bonjour, je vous contacte via votre site web. Je souhaiterais obtenir des informations sur vos services juridiques.',
  messageEn:
    'Hello, I am contacting you through your website. I would like to get information about your legal services.',
  showFloatingButton: true,
};

// ──────────────────────────────────────
// TEMPLATE CONFIG COMPLÈTE
// ──────────────────────────────────────

export const corporateConfig: TemplateConfig = {
  id: 'corporate',
  theme: {
    id: 'corporate',
    colors: {
      background: '#F5F5F0',
      foreground: '#0A0A0A',
      primary: '#0A0A0A',
      primaryForeground: '#F5F5F0',
      accent: '#C9A84C',
      accentForeground: '#0A0A0A',
      muted: '#F5F5F5',
      mutedForeground: '#737373',
      border: '#E5E5E5',
      card: '#FFFFFF',
      cardForeground: '#0A0A0A',
    },
    fonts: {
      display: 'Playfair Display, Georgia, serif',
      body: 'Inter, Helvetica Neue, system-ui, sans-serif',
      mono: 'JetBrains Mono, Fira Code, monospace',
    },
    radii: {
      sm: '2px',
      md: '4px',
      lg: '6px',
      card: '4px',
    },
    features: {
      whatsapp: true,
      contactForm: true,
      gallery: false,
      map: true,
      testimonials: true,
      team: true,
      stats: true,
      newsletter: false,
      multiLanguage: true,
      darkMode: false,
    },
  },
  seo: corporateSeoConfig,
  contact: {
    email: 'contact@dupont-associes.cm',
    phone: '+237 222 00 00 00',
    address: corporateSeoConfig.business.address,
    socialLinks: [
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/company/dupont-associes',
        label: 'LinkedIn',
      },
      {
        platform: 'facebook',
        url: 'https://facebook.com/dupont-associes',
        label: 'Facebook',
      },
    ],
  },
  whatsapp: corporateWhatsAppConfig,
};
