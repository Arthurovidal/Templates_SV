import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': { fr: '/notre-histoire', en: '/our-story' },
    '/services': { fr: '/menu', en: '/menu' },
    '/services/[slug]': { fr: '/menu/[slug]', en: '/menu/[slug]' },
    '/team': { fr: '/equipe', en: '/team' },
    '/contact': { fr: '/reservation', en: '/reservation' },
  },
});

export type Pathname = keyof typeof routing.pathnames;
