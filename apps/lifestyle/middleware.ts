import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Middleware Next.js pour:
 * 1. Routing i18n automatique (redirection vers /fr ou /en)
 * 2. La sécurité est gérée dans next.config.ts (headers)
 */
export default createMiddleware(routing);

export const config = {
  // Matcher: toutes les routes sauf:
  // - Fichiers statiques (_next, assets)
  // - API routes (/api/*)
  // - Fichiers avec extension (.png, .jpg, etc.)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
