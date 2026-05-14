import type { MetadataRoute } from 'next';
import { immobilierSeoConfig } from '@/lib/config';

/**
 * Génère le robots.txt dynamiquement.
 * En développement: tout est bloqué (évite l'indexation staging).
 * En production: tout est autorisé sauf les routes sensibles.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = immobilierSeoConfig.siteUrl;
  const isProduction = process.env['NODE_ENV'] === 'production';

  if (!isProduction) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // Ne pas indexer les API Routes
          '/_next/',        // Assets Next.js
          '/admin/',        // Si admin ajouté en V2
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
