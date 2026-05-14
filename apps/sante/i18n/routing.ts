import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': { fr: '/a-propos', en: '/about' },
    '/services': { fr: '/specialites', en: '/specialties' },
    '/services/[slug]': { fr: '/specialites/[slug]', en: '/specialties/[slug]' },
    '/team': { fr: '/medecins', en: '/doctors' },
    '/contact': { fr: '/contact', en: '/contact' },
  },
});

export type Pathname = keyof typeof routing.pathnames;
