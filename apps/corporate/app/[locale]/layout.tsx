import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { buildBaseMetadata } from '@template/utils';
import { corporateSeoConfig } from '@/lib/config';
import '@/styles/globals.css';

// ── Fonts ──────────────────────────────────────────────────────
// next/font héberge automatiquement les fonts en local.
// Avantages: zéro requête externe, GDPR compliant, LCP amélioré.

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap', // Texte visible pendant chargement font
  // Subset minimal pour performance (latin = Cameroun + Europe)
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // Variable font: un seul fichier pour tous les weights
  weight: 'variable',
});

// ── Metadata ───────────────────────────────────────────────────

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    ...buildBaseMetadata(corporateSeoConfig, locale as 'fr' | 'en'),
    title: {
      default: t('title'),
      template: `%s | Dupont & Associés`,
    },
    description: t('description'),
    keywords: t('keywords'),
  };
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

// ── Layout ──────────────────────────────────────────────────────

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Préchargement des ressources critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Couleur du thème mobile (barre d'adresse) */}
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {/* Skip navigation pour accessibilité */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
          >
            {locale === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
          </a>

          <main id="main-content">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
