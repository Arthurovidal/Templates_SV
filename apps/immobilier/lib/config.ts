import type { SeoConfig, WhatsAppConfig, TemplateConfig } from '@template/types';

export const immobilierSeoConfig: SeoConfig = {
  siteName: process.env['NEXT_PUBLIC_IMMO_SITE_NAME'] ?? 'Prestige Immobilier Cameroun',
  siteUrl: process.env['NEXT_PUBLIC_IMMO_SITE_URL'] ?? 'http://localhost:3003',
  defaultLocale: 'fr',
  business: {
    name: 'Prestige Immobilier — Agence Premium Cameroun',
    description:
      'Agence immobilière premium à Yaoundé et Douala. Vente, location et gestion de biens résidentiels et commerciaux haut de gamme au Cameroun.',
    url: process.env['NEXT_PUBLIC_IMMO_SITE_URL'] ?? 'http://localhost:3003',
    telephone: '+237 244 00 00 00',
    email: 'contact@prestige-immo.cm',
    type: 'RealEstateAgent',
    priceRange: 'FCFA',
    address: {
      streetAddress: 'Avenue de l\'Indépendance, Bastos',
      addressLocality: 'Yaoundé',
      addressRegion: 'Centre',
      addressCountry: 'CM',
    },
    geo: { latitude: 3.8840, longitude: 11.5167 },
    openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-14:00'],
  },
};

export const immobilierWhatsAppConfig: WhatsAppConfig = {
  number: process.env['NEXT_PUBLIC_IMMO_WHATSAPP'] ?? '237699000003',
  messageFr: 'Bonjour, je suis intéressé(e) par un bien immobilier. Pouvez-vous m\'aider ?',
  messageEn: 'Hello, I am interested in a property. Can you help me?',
  showFloatingButton: true,
};

export const immobilierConfig: TemplateConfig = {
  id: 'immobilier',
  theme: {
    id: 'immobilier',
    colors: {
      background: '#F9F6F0',
      foreground: '#1A1A1A',
      primary: '#1A1A1A',
      primaryForeground: '#F9F6F0',
      accent: '#D4AF37',
      accentForeground: '#1A1A1A',
      muted: '#F0EDE6',
      mutedForeground: '#737373',
      border: '#E8E3D8',
      card: '#FFFFFF',
      cardForeground: '#1A1A1A',
    },
    fonts: {
      display: 'Cormorant Garamond, Georgia, serif',
      body: 'Montserrat, Helvetica Neue, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    radii: { sm: '1px', md: '2px', lg: '4px', card: '2px' },
    features: {
      whatsapp: true, contactForm: true, gallery: true, map: true,
      testimonials: true, team: true, stats: true,
      newsletter: false, multiLanguage: true, darkMode: false,
    },
  },
  seo: immobilierSeoConfig,
  contact: {
    email: 'contact@prestige-immo.cm',
    phone: '+237 244 00 00 00',
    address: immobilierSeoConfig.business.address,
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/prestige-immo', label: 'Instagram' },
      { platform: 'facebook', url: 'https://facebook.com/prestige-immo', label: 'Facebook' },
    ],
  },
  whatsapp: immobilierWhatsAppConfig,
};
