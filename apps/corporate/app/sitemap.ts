import type { MetadataRoute } from 'next';
import { corporateSeoConfig } from '@/lib/config';

/**
 * Génère le sitemap.xml dynamiquement.
 * Next.js 15 l'expose automatiquement sur /sitemap.xml
 *
 * SEO: le sitemap aide Google à découvrir et indexer toutes vos pages.
 * Inclure les hreflang pour les versions FR/EN.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = corporateSeoConfig.siteUrl;
  const now = new Date();

  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: '/a-propos', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/equipe', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
    // Services individuels
    { path: '/services/droit-des-affaires', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services/droit-fiscal', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services/droit-social', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/services/arbitrage', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/services/droit-immobilier', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/services/banque-finance', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // Version française
    entries.push({
      url: `${baseUrl}/fr${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr${page.path}`,
          en: `${baseUrl}/en${page.path.replace('/a-propos', '/about').replace('/equipe', '/team')}`,
        },
      },
    });

    // Version anglaise
    const enPath = page.path
      .replace('/a-propos', '/about')
      .replace('/equipe', '/team');

    entries.push({
      url: `${baseUrl}/en${enPath}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority * 0.9, // Légère priorité moindre pour EN sur marché FR
    });
  }

  return entries;
}
