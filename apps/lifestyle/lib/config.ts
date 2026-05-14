import type { SeoConfig, WhatsAppConfig, TemplateConfig } from '@template/types';

export const lifestyleSeoConfig: SeoConfig = {
  siteName: process.env['NEXT_PUBLIC_LIFESTYLE_SITE_NAME'] ?? 'Chez Mama Africa',
  siteUrl: process.env['NEXT_PUBLIC_LIFESTYLE_SITE_URL'] ?? 'http://localhost:3004',
  defaultLocale: 'fr',
  business: {
    name: 'Chez Mama Africa — Restaurant & Bar Lounge',
    description:
      'Restaurant gastronomique africain moderne à Yaoundé. Cuisine camerounaise revisitée, ambiance lounge, événements privés. Réservation sur WhatsApp.',
    url: process.env['NEXT_PUBLIC_LIFESTYLE_SITE_URL'] ?? 'http://localhost:3004',
    telephone: '+237 255 00 00 00',
    email: 'contact@mama-africa.cm',
    type: 'Restaurant',
    priceRange: '$$',
    servesCuisine: 'African, Cameroonian',
    address: {
      streetAddress: 'Avenue Charles de Gaulle, Nlongkak',
      addressLocality: 'Yaoundé',
      addressRegion: 'Centre',
      addressCountry: 'CM',
    },
    geo: { latitude: 3.8680, longitude: 11.5196 },
    openingHours: ['Tu-Su 12:00-23:00'],
  },
};

export const lifestyleWhatsAppConfig: WhatsAppConfig = {
  number: process.env['NEXT_PUBLIC_LIFESTYLE_WHATSAPP'] ?? '237699000004',
  messageFr: 'Bonjour, je souhaite faire une réservation chez Mama Africa.',
  messageEn: 'Hello, I would like to make a reservation at Mama Africa.',
  showFloatingButton: true,
};

export const lifestyleConfig: TemplateConfig = {
  id: 'lifestyle',
  theme: {
    id: 'lifestyle',
    colors: {
      background: '#0D0D0D',
      foreground: '#F5EBD6',
      primary: '#0D0D0D',
      primaryForeground: '#F5EBD6',
      accent: '#F5C542',
      accentForeground: '#0D0D0D',
      muted: '#1A1A1A',
      mutedForeground: '#8C8C8C',
      border: '#2E2E2E',
      card: '#141414',
      cardForeground: '#F5EBD6',
    },
    fonts: {
      display: 'Bebas Neue, Impact, sans-serif',
      body: 'Lato, Helvetica Neue, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    radii: { sm: '0px', md: '2px', lg: '4px', card: '0px' },
    features: {
      whatsapp: true, contactForm: true, gallery: true, map: true,
      testimonials: true, team: false, stats: true,
      newsletter: false, multiLanguage: true, darkMode: false,
    },
  },
  seo: lifestyleSeoConfig,
  contact: {
    email: 'contact@mama-africa.cm',
    phone: '+237 255 00 00 00',
    address: lifestyleSeoConfig.business.address,
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/mama-africa-yaounde', label: 'Instagram' },
      { platform: 'facebook', url: 'https://facebook.com/mama-africa-yaounde', label: 'Facebook' },
      { platform: 'tiktok', url: 'https://tiktok.com/@mama-africa', label: 'TikTok' },
    ],
  },
  whatsapp: lifestyleWhatsAppConfig,
};
