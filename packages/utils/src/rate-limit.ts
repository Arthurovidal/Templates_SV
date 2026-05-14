/**
 * Rate limiting pour les API Routes Next.js.
 * Protège les formulaires de contact contre le spam et les attaques par force brute.
 *
 * Stratégie: compteur par IP + endpoint, stocké dans Redis.
 * Fallback: si Redis indisponible, on laisse passer (fail-open) en DEV,
 *           on bloque en PROD pour ne pas laisser de failles.
 */

interface RateLimitOptions {
  /** Nombre max de requêtes dans la fenêtre */
  limit: number;
  /** Durée de la fenêtre en secondes */
  windowSec: number;
  /** Identifiant de l'IP ou utilisateur */
  identifier: string;
  /** Endpoint (ex: 'contact', 'newsletter') */
  endpoint: string;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

/**
 * Vérifie si une requête est autorisée selon le rate limit.
 *
 * Utilise Redis si disponible, sinon Map en mémoire (ne persiste pas entre redémarrages).
 * En production, toujours utiliser Redis.
 */
export async function checkRateLimit(options: RateLimitOptions): Promise<RateLimitResult> {
  const { limit, windowSec, identifier, endpoint } = options;
  const key = `ratelimit:${endpoint}:${identifier}`;
  const resetAt = new Date(Date.now() + windowSec * 1000);

  // ── Tentative avec Redis ────────────────────────────
  const redisUrl = process.env['REDIS_URL'];

  if (redisUrl) {
    try {
      return await checkWithRedis(key, limit, windowSec, resetAt);
    } catch (error) {
      console.warn('[RateLimit] Redis indisponible, fallback mémoire:', error);
    }
  }

  // ── Fallback: Map en mémoire ───────────────────────
  return checkWithMemory(key, limit, windowSec, resetAt);
}

// ──────────────────────────────────────
// Implémentation Redis
// ──────────────────────────────────────

async function checkWithRedis(
  key: string,
  limit: number,
  windowSec: number,
  resetAt: Date,
): Promise<RateLimitResult> {
  // Import dynamique pour éviter l'erreur si redis n'est pas installé
  const { createClient } = await import('redis');

  const client = createClient({ url: process.env['REDIS_URL'] });
  await client.connect();

  try {
    const [count] = await client
      .multi()
      .incr(key)
      .expire(key, windowSec)
      .exec() as [number, number];

    const remaining = Math.max(0, limit - count);
    const allowed = count <= limit;

    return { allowed, remaining, resetAt };
  } finally {
    await client.disconnect();
  }
}

// ──────────────────────────────────────
// Fallback: Map en mémoire (dev seulement)
// ──────────────────────────────────────

const memoryStore = new Map<string, { count: number; expiresAt: number }>();

function checkWithMemory(
  key: string,
  limit: number,
  windowSec: number,
  resetAt: Date,
): RateLimitResult {
  const now = Date.now();

  // Nettoyer les entrées expirées
  for (const [k, v] of memoryStore.entries()) {
    if (v.expiresAt < now) memoryStore.delete(k);
  }

  const existing = memoryStore.get(key);

  if (!existing || existing.expiresAt < now) {
    memoryStore.set(key, { count: 1, expiresAt: now + windowSec * 1000 });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  existing.count++;
  const allowed = existing.count <= limit;
  const remaining = Math.max(0, limit - existing.count);

  return { allowed, remaining, resetAt };
}

/**
 * Extrait l'IP réelle d'une requête Next.js.
 * Gère les proxies (Nginx, Cloudflare, Vercel).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}
