import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': { fr: '/a-propos', en: '/about' },
    '/services': { fr: '/proprietes', en: '/properties' },
    '/services/[slug]': { fr: '/proprietes/[slug]', en: '/properties/[slug]' },
    '/team': { fr: '/agents', en: '/agents' },
    '/contact': { fr: '/contact', en: '/contact' },
  },
});

export type Pathname = keyof typeof routing.pathnames;
