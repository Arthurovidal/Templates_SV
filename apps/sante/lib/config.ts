import type { SeoConfig, WhatsAppConfig, TemplateConfig } from '@template/types';

export const santeSeoConfig: SeoConfig = {
  siteName: process.env['NEXT_PUBLIC_SANTE_SITE_NAME'] ?? 'Clinique Espoir Yaoundé',
  siteUrl: process.env['NEXT_PUBLIC_SANTE_SITE_URL'] ?? 'http://localhost:3002',
  defaultLocale: 'fr',
  business: {
    name: 'Clinique Espoir — Centre Médical Spécialisé',
    description:
      'Clinique médicale moderne à Yaoundé. Consultations, urgences, chirurgie, maternité. Équipe de spécialistes qualifiés. Ouverte 24h/24.',
    url: process.env['NEXT_PUBLIC_SANTE_SITE_URL'] ?? 'http://localhost:3002',
    telephone: '+237 233 00 00 00',
    email: 'contact@clinique-espoir.cm',
    type: 'MedicalOrganization',
    specialty: 'GeneralPractice',
    priceRange: 'FCFA',
    address: {
      streetAddress: 'Rue de la Joie, Quartier Mvog-Mbi',
      addressLocality: 'Yaoundé',
      addressRegion: 'Centre',
      addressCountry: 'CM',
    },
    geo: { latitude: 3.8480, longitude: 11.5021 },
    openingHours: ['Mo-Su 00:00-24:00'],
  },
};

export const santeWhatsAppConfig: WhatsAppConfig = {
  number: process.env['NEXT_PUBLIC_SANTE_WHATSAPP'] ?? '237699000002',
  messageFr: 'Bonjour, je souhaite prendre rendez-vous à la Clinique Espoir.',
  messageEn: 'Hello, I would like to schedule an appointment at Clinique Espoir.',
  showFloatingButton: true,
};

export const santeConfig: TemplateConfig = {
  id: 'sante',
  theme: {
    id: 'sante',
    colors: {
      background: '#F0F8FF',
      foreground: '#0F172A',
      primary: '#2563EB',
      primaryForeground: '#FFFFFF',
      accent: '#10B981',
      accentForeground: '#FFFFFF',
      muted: '#F1F5F9',
      mutedForeground: '#64748B',
      border: '#E2E8F0',
      card: '#FFFFFF',
      cardForeground: '#0F172A',
    },
    fonts: {
      display: 'Plus Jakarta Sans, Helvetica Neue, system-ui, sans-serif',
      body: 'Plus Jakarta Sans, Helvetica Neue, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    radii: { sm: '6px', md: '10px', lg: '14px', card: '12px' },
    features: {
      whatsapp: true, contactForm: true, gallery: true, map: true,
      testimonials: true, team: true, stats: true,
      newsletter: false, multiLanguage: true, darkMode: false,
    },
  },
  seo: santeSeoConfig,
  contact: {
    email: 'contact@clinique-espoir.cm',
    phone: '+237 233 00 00 00',
    address: santeSeoConfig.business.address,
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/clinique-espoir', label: 'Facebook' },
    ],
  },
  whatsapp: santeWhatsAppConfig,
};
