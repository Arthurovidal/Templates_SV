import { defineRouting } from 'next-intl/routing';

/**
 * Configuration du routing i18n pour le template Corporate.
 * Locales: FR (défaut) + EN
 *
 * URLs générées:
 * /fr          → Homepage français
 * /en          → Homepage anglais
 * /fr/services → Services en français
 * /en/services → Services in English
 */
export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',

  // Noms de paths localisés (optionnel, améliore le SEO)
  pathnames: {
    '/': '/',
    '/about': {
      fr: '/a-propos',
      en: '/about',
    },
    '/services': {
      fr: '/services',
      en: '/services',
    },
    '/services/[slug]': {
      fr: '/services/[slug]',
      en: '/services/[slug]',
    },
    '/team': {
      fr: '/equipe',
      en: '/team',
    },
    '/contact': {
      fr: '/contact',
      en: '/contact',
    },
  },
});

export type Pathname = keyof typeof routing.pathnames;
