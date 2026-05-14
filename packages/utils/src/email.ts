/**
 * Client email partagé utilisant Resend.
 * SERVEUR UNIQUEMENT — Ne jamais importer côté client.
 * La clé API Resend ne doit jamais être exposée dans le bundle client.
 */

export interface SendEmailOptions {
  to: string;
  from?: string;
  subject: string;
  html: string;
  replyTo?: string;
  /** Template d'identification pour le suivi */
  templateId?: string;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Envoie un email via Resend.
 * Gère les erreurs gracieusement sans faire crasher l'API Route.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env['RESEND_API_KEY'];
  const fromDefault = process.env['EMAIL_FROM'] ?? 'noreply@resend.dev';

  if (!apiKey) {
    console.error('[Email] RESEND_API_KEY manquant — email non envoyé');
    // En développement on simule le succès pour ne pas bloquer les tests
    if (process.env['NODE_ENV'] === 'development') {
      console.warn('[Email DEV] Email simulé:', { to: options.to, subject: options.subject });
      return { success: true, id: 'dev-simulated' };
    }
    return { success: false, error: 'Configuration email manquante' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from ?? fromDefault,
        to: [options.to],
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo,
      }),
    });

    const data = await response.json() as { id?: string; message?: string };

    if (!response.ok) {
      console.error('[Email] Erreur Resend:', data);
      return { success: false, error: data.message ?? 'Erreur envoi email' };
    }

    return { success: true, id: data.id };
  } catch (error) {
    console.error('[Email] Erreur réseau:', error);
    return { success: false, error: 'Erreur réseau lors de l\'envoi' };
  }
}

// ──────────────────────────────────────
// TEMPLATES HTML EMAIL
// ──────────────────────────────────────

/**
 * Template email de notification de nouveau contact.
 * Envoyé au propriétaire du site.
 */
export function buildContactNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  siteName: string;
  siteUrl: string;
  templateId: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message — ${data.siteName}</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: #0A0A0A; color: white; padding: 24px 32px;">
      <p style="margin: 0; font-size: 12px; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">
        ${data.siteName}
      </p>
      <h1 style="margin: 8px 0 0; font-size: 20px; font-weight: 600;">
        📬 Nouveau message de contact
      </h1>
    </div>
    
    <!-- Contenu -->
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 100px; vertical-align: top;">Nom :</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0A0A0A;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Email :</td>
          <td style="padding: 8px 0;">
            <a href="mailto:${data.email}" style="color: #2563EB;">${data.email}</a>
          </td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Téléphone :</td>
          <td style="padding: 8px 0; font-weight: 500;">
            <a href="tel:${data.phone}" style="color: #0A0A0A;">${data.phone}</a>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Sujet :</td>
          <td style="padding: 8px 0; font-weight: 600;">${data.subject}</td>
        </tr>
      </table>
      
      <div style="margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 24px;">
        <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">Message :</p>
        <div style="background: #f9fafb; padding: 16px; border-radius: 6px; border-left: 3px solid #0A0A0A;">
          <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      
      <!-- Actions rapides -->
      <div style="margin-top: 24px; display: flex; gap: 12px;">
        <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}"
           style="display: inline-block; padding: 10px 20px; background: #0A0A0A; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
          ↩ Répondre
        </a>
        ${data.phone ? `
        <a href="https://wa.me/${data.phone.replace(/\D/g, '')}"
           style="display: inline-block; padding: 10px 20px; background: #25D366; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
          💬 WhatsApp
        </a>` : ''}
      </div>
    </div>
    
    <!-- Footer -->
    <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
        Message reçu via ${data.siteUrl} · Template: ${data.templateId}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Template email de confirmation envoyé à l'utilisateur.
 */
export function buildContactConfirmationEmail(data: {
  name: string;
  siteName: string;
  siteUrl: string;
  locale: 'fr' | 'en';
}): string {
  const isFr = data.locale === 'fr';

  return `
<!DOCTYPE html>
<html lang="${data.locale}">
<head>
  <meta charset="UTF-8">
  <title>${isFr ? 'Confirmation' : 'Confirmation'} — ${data.siteName}</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: #0A0A0A; color: white; padding: 32px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">✅ ${isFr ? 'Message reçu !' : 'Message received!'}</h1>
    </div>
    <div style="padding: 32px; text-align: center;">
      <p style="color: #374151; font-size: 16px; line-height: 1.6;">
        ${isFr
          ? `Bonjour <strong>${data.name}</strong>, nous avons bien reçu votre message. Notre équipe vous répondra dans les plus brefs délais.`
          : `Hello <strong>${data.name}</strong>, we have received your message. Our team will get back to you as soon as possible.`
        }
      </p>
      <p style="color: #6b7280; font-size: 14px;">
        ${isFr ? 'Pour une réponse rapide, contactez-nous directement sur WhatsApp.' : 'For a quick response, contact us directly on WhatsApp.'}
      </p>
    </div>
    <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">${data.siteName} · ${data.siteUrl}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
