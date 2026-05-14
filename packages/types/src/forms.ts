// ══════════════════════════════════════════════════════════════
// TYPES FORMULAIRES
// Ces types correspondent aux schemas Zod dans @template/utils/validators
// ══════════════════════════════════════════════════════════════

/**
 * Données du formulaire de contact standard
 */
export interface ContactFormData {
  name: string;           // Min 2, Max 100 chars
  email: string;          // Format email valide
  phone?: string;         // Format camerounais +237 ou international
  subject: string;        // Min 5, Max 200 chars
  message: string;        // Min 20, Max 2000 chars
  /** Champ honeypot anti-bot — doit rester vide */
  _honeypot?: string;
  /** Consentement RGPD */
  consent: boolean;
}

/**
 * Réponse de l'API /api/contact
 */
export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Contexte WhatsApp pour le message pré-rempli
 */
export interface WhatsAppContext {
  source: 'hero-cta' | 'contact-page' | 'service-card' | 'floating-button' | 'team-card';
  serviceName?: string;    // Si depuis une card de service
  propertyId?: string;     // Si depuis une propriété immobilière
  doctorName?: string;     // Si depuis un médecin (template santé)
}
