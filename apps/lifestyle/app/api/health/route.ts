import { NextResponse } from 'next/server';

/**
 * GET /api/health
 *
 * Endpoint de healthcheck utilisé par:
 * - Docker HEALTHCHECK instruction
 * - Nginx upstream check
 * - Monitoring (UptimeRobot, etc.)
 *
 * Retourne 200 si le serveur est opérationnel.
 * Ne jamais exposer d'informations sensibles ici.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      template: 'lifestyle',
      timestamp: new Date().toISOString(),
      // Pas d'infos système, pas de version (surface d'attaque réduite)
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache',
      },
    },
  );
}
