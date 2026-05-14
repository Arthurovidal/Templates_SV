import type { WhatsAppConfig, WhatsAppContext } from '@template/types';

/**
 * Génère un lien WhatsApp avec message pré-rempli contextualisé.
 * Fonctionne sur mobile (ouvre l'app) et desktop (ouvre WhatsApp Web).
 *
 * IMPORTANT: Utilise wa.me (API officielle gratuite, sans clé API).
 * Conversion en Afrique: le taux de clic WhatsApp est 3-5x > formulaire email.
 *
 * @example
 * generateWhatsAppLink({
 *   number: '237699123456',
 *   messageFr: 'Bonjour...',
 *   messageEn: 'Hello...',
 *   showFloatingButton: true
 * }, 'fr', { source: 'hero-cta' })
 * → "https://wa.me/237699123456?text=Bonjour..."
 */
export function generateWhatsAppLink(
  config: WhatsAppConfig,
  locale: 'fr' | 'en' = 'fr',
  context?: WhatsAppContext,
): string {
  const baseMessage = locale === 'fr' ? config.messageFr : config.messageEn;

  // Enrichir le message selon le contexte
  let message = baseMessage;

  if (context?.serviceName) {
    message += locale === 'fr'
      ? ` Je suis intéressé(e) par votre service : "${context.serviceName}".`
      : ` I'm interested in your service: "${context.serviceName}".`;
  }

  if (context?.propertyId) {
    message += locale === 'fr'
      ? ` Référence bien immobilier : ${context.propertyId}.`
      : ` Property reference: ${context.propertyId}.`;
  }

  if (context?.doctorName) {
    message += locale === 'fr'
      ? ` Je souhaite prendre rendez-vous avec ${context.doctorName}.`
      : ` I'd like to schedule an appointment with ${context.doctorName}.`;
  }

  // Nettoyer le numéro (supprimer tout sauf les chiffres)
  const cleanNumber = config.number.replace(/\D/g, '');

  // Encoder le message pour l'URL
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Ouvre WhatsApp dans un nouvel onglet.
 * Préféré à window.location pour ne pas perdre la page courante.
 */
export function openWhatsApp(
  config: WhatsAppConfig,
  locale: 'fr' | 'en' = 'fr',
  context?: WhatsAppContext,
): void {
  const link = generateWhatsAppLink(config, locale, context);
  window.open(link, '_blank', 'noopener,noreferrer');
}

/**
 * Vérifie si un numéro WhatsApp camerounais est valide
 *
 * @example
 * isValidCamerounWhatsApp('237699123456') → true
 * isValidCamerounWhatsApp('237699')       → false
 */
export function isValidCamerounWhatsApp(number: string): boolean {
  const cleaned = number.replace(/\D/g, '');
  // Format camerounais: 237 suivi de 9 chiffres commençant par 6
  return /^237[6-9]\d{8}$/.test(cleaned);
}
