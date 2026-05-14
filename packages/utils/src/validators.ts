import { z } from 'zod';

// ──────────────────────────────────────
// PRIMITIVES
// ──────────────────────────────────────

/** Validation téléphone camerounais et international */
const phoneSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === '') return true;
      const cleaned = val.replace(/[\s\-\(\)\+]/g, '');
      // Cameroun: 237 + 9 chiffres OU numéro local 9 chiffres
      // International: 7-15 chiffres
      return /^(\d{7,15})$/.test(cleaned);
    },
    { message: 'Numéro de téléphone invalide' },
  );

// ──────────────────────────────────────
// FORMULAIRE DE CONTACT
// ──────────────────────────────────────

/**
 * Schema Zod pour le formulaire de contact.
 * Utilisé côté CLIENT (validation instantanée) ET SERVEUR (sécurité).
 *
 * SÉCURITÉ:
 * - maxLength sur tous les champs (prévient les payloads trop larges)
 * - trim() automatique (prévient les espaces malicieux)
 * - honeypot field (anti-bot)
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .trim()
    .transform((v) => v.replace(/<[^>]*>/g, '')), // Strip HTML tags

  email: z
    .string()
    .email('Adresse email invalide')
    .max(254, 'Email trop long')
    .toLowerCase()
    .trim(),

  phone: phoneSchema,

  subject: z
    .string()
    .min(3, 'Le sujet doit contenir au moins 3 caractères')
    .max(200, 'Le sujet ne peut pas dépasser 200 caractères')
    .trim()
    .transform((v) => v.replace(/<[^>]*>/g, '')),

  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères')
    .trim()
    .transform((v) => v.replace(/<[^>]*>/g, '')),

  /** Honeypot: doit être vide. Si rempli → bot détecté */
  _honeypot: z.string().max(0, 'Erreur de validation').optional(),

  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: 'Vous devez accepter les conditions de traitement des données',
    }),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

// ──────────────────────────────────────
// HELPERS
// ──────────────────────────────────────

/**
 * Formate les erreurs Zod en objet clé → message pour React Hook Form
 */
export function formatZodErrors(
  errors: z.ZodError,
): Record<string, string> {
  return errors.issues.reduce(
    (acc, issue) => {
      const key = issue.path.join('.');
      acc[key] = issue.message;
      return acc;
    },
    {} as Record<string, string>,
  );
}

/**
 * Sanitise une chaîne contre les injections XSS basiques.
 * Complément à Zod, pas un remplacement.
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
