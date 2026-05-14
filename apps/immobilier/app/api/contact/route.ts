import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  contactFormSchema,
  sendEmail,
  buildContactNotificationEmail,
  buildContactConfirmationEmail,
  checkRateLimit,
  getClientIp,
} from '@template/utils';

/**
 * POST /api/contact
 *
 * Flux de sécurité:
 * 1. Rate limiting par IP (3 req/min)
 * 2. Validation Zod côté serveur (double sécurité après client)
 * 3. Honeypot anti-bot
 * 4. Sanitisation des données
 * 5. Envoi email via Resend
 *
 * NE JAMAIS exposer les erreurs internes au client.
 */
export async function POST(request: Request) {
  // ── 1. Rate Limiting ─────────────────────────────────────
  const ip = getClientIp(request);
  const rateLimit = await checkRateLimit({
    identifier: ip,
    endpoint: 'contact-immobilier',
    limit: 3,
    windowSec: 60,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message:
          'Trop de tentatives. Veuillez patienter une minute avant de réessayer.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': '3',
          'X-RateLimit-Remaining': '0',
        },
      },
    );
  }

  // ── 2. Parse du body ─────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Corps de la requête invalide.' },
      { status: 400 },
    );
  }

  // ── 3. Validation Zod ────────────────────────────────────
  const parseResult = contactFormSchema.safeParse(body);

  if (!parseResult.success) {
    const errors = parseResult.error.issues.reduce(
      (acc, issue) => {
        acc[issue.path.join('.')] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );

    return NextResponse.json(
      { success: false, message: 'Données invalides.', errors },
      { status: 422 },
    );
  }

  const data = parseResult.data;

  // ── 4. Honeypot check (anti-bot) ─────────────────────────
  if (data._honeypot && data._honeypot.length > 0) {
    // Simuler un succès pour ne pas alerter le bot
    console.warn('[Security] Honeypot déclenché depuis IP:', ip);
    return NextResponse.json({ success: true, message: 'Message envoyé.' });
  }

  // ── 5. Envoi des emails ──────────────────────────────────
  const siteName = process.env['NEXT_PUBLIC_IMMOBILIER_SITE_NAME'] ?? 'Cabinet';
  const siteUrl = process.env['NEXT_PUBLIC_IMMOBILIER_SITE_URL'] ?? 'http://localhost:3001';
  const toEmail = process.env['IMMOBILIER_CONTACT_EMAIL_TO'];

  if (!toEmail) {
    console.error('[Contact] IMMOBILIER_CONTACT_EMAIL_TO manquant');
    return NextResponse.json(
      { success: false, message: 'Configuration du serveur incorrecte.' },
      { status: 500 },
    );
  }

  // Détecter la locale depuis les headers Accept-Language
  const acceptLanguage = request.headers.get('accept-language') ?? 'fr';
  const locale: 'fr' | 'en' = acceptLanguage.startsWith('en') ? 'en' : 'fr';

  // Email de notification au cabinet
  const notificationResult = await sendEmail({
    to: toEmail,
    subject: `[Nouveau contact] ${data.subject} — ${data.name}`,
    html: buildContactNotificationEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      siteName,
      siteUrl,
      templateId: 'immobilier',
    }),
    replyTo: data.email,
    templateId: 'immobilier-notification',
  });

  if (!notificationResult.success) {
    console.error('[Contact] Échec envoi notification:', notificationResult.error);
    return NextResponse.json(
      {
        success: false,
        message:
          locale === 'fr'
            ? 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter sur WhatsApp.'
            : 'Send error. Please try again or contact us on WhatsApp.',
      },
      { status: 500 },
    );
  }

  // Email de confirmation à l'utilisateur (fire-and-forget, non bloquant)
  sendEmail({
    to: data.email,
    subject:
      locale === 'fr'
        ? `Confirmation de votre message — ${siteName}`
        : `Confirmation of your message — ${siteName}`,
    html: buildContactConfirmationEmail({
      name: data.name,
      siteName,
      siteUrl,
      locale,
    }),
    templateId: 'immobilier-confirmation',
  }).catch((err) => {
    console.warn('[Contact] Email confirmation non envoyé:', err);
  });

  // ── 6. Succès ────────────────────────────────────────────
  return NextResponse.json(
    {
      success: true,
      message:
        locale === 'fr'
          ? 'Votre message a bien été envoyé. Nous vous répondrons sous 24h.'
          : 'Your message has been sent. We will reply within 24 hours.',
    },
    { status: 200 },
  );
}

// Bloquer les autres méthodes HTTP
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
