/**
 * Utilitaires de formatage adaptés au marché camerounais et africain.
 * Gère les devises XAF (Franc CFA), EUR, USD avec formatage local.
 */

// ──────────────────────────────────────
// MONNAIE
// ──────────────────────────────────────

type Currency = 'XAF' | 'EUR' | 'USD';

/**
 * Formate un montant dans la devise spécifiée.
 * Utilise le format camerounais pour XAF (espace comme séparateur des milliers).
 *
 * @example
 * formatCurrency(15000000, 'XAF') → "15 000 000 FCFA"
 * formatCurrency(22900, 'EUR')    → "22 900 €"
 * formatCurrency(18000, 'USD')    → "$18,000"
 */
export function formatCurrency(amount: number, currency: Currency = 'XAF'): string {
  if (currency === 'XAF') {
    return `${amount.toLocaleString('fr-CM', { maximumFractionDigits: 0 })} FCFA`;
  }

  return new Intl.NumberFormat(currency === 'EUR' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formate un prix immobilier avec le type (vente/location)
 *
 * @example
 * formatPropertyPrice(45000000, 'XAF', 'sale')  → "45 000 000 FCFA"
 * formatPropertyPrice(150000, 'XAF', 'rent')     → "150 000 FCFA / mois"
 */
export function formatPropertyPrice(
  amount: number,
  currency: Currency,
  type: 'sale' | 'rent' | 'rent-per-month',
): string {
  const base = formatCurrency(amount, currency);
  if (type === 'rent' || type === 'rent-per-month') return `${base} / mois`;
  return base;
}

// ──────────────────────────────────────
// DATES
// ──────────────────────────────────────

/**
 * Formate une date en français camerounais
 *
 * @example
 * formatDate(new Date('2024-03-15'), 'fr') → "15 mars 2024"
 * formatDate(new Date('2024-03-15'), 'en') → "March 15, 2024"
 */
export function formatDate(date: Date | string, locale: 'fr' | 'en' = 'fr'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CM' : 'en-CM', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Formate une date de manière relative ("il y a 3 jours")
 */
export function formatRelativeDate(date: Date | string, locale: 'fr' | 'en' = 'fr'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (locale === 'fr') {
    if (diffDays === 0) return "aujourd'hui";
    if (diffDays === 1) return 'hier';
    if (diffDays < 30) return `il y a ${diffDays} jours`;
    if (diffDays < 365) return `il y a ${Math.floor(diffDays / 30)} mois`;
    return `il y a ${Math.floor(diffDays / 365)} an${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
  } else {
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
  }
}

// ──────────────────────────────────────
// TÉLÉPHONE
// ──────────────────────────────────────

/**
 * Formate un numéro de téléphone camerounais
 *
 * @example
 * formatCamerounPhone('237699123456')   → "+237 6 99 12 34 56"
 * formatCamerounPhone('699123456')      → "+237 6 99 12 34 56"
 */
export function formatCamerounPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const number = cleaned.startsWith('237') ? cleaned.slice(3) : cleaned;

  if (number.length !== 9) return `+237 ${number}`;

  return `+237 ${number[0]} ${number.slice(1, 3)} ${number.slice(3, 5)} ${number.slice(5, 7)} ${number.slice(7, 9)}`;
}

// ──────────────────────────────────────
// TEXTE
// ──────────────────────────────────────

/**
 * Tronque un texte avec ellipse
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Convertit un titre en slug URL-friendly
 *
 * @example
 * slugify("Droit des Affaires & Conseil") → "droit-des-affaires-conseil"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Capitalise la première lettre
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
