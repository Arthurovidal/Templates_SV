import type { Metadata } from 'next';
import type { SeoConfig, Locale } from '@template/types';

/**
 * Génère les metadata Next.js de base pour un template.
 * À utiliser dans generateMetadata() de chaque page.
 */
export function buildBaseMetadata(
  config: SeoConfig,
  locale: Locale,
): Metadata {
  const isProduction = process.env['NODE_ENV'] === 'production';

  return {
    metadataBase: new URL(config.siteUrl),

    title: {
      default: config.siteName,
      template: `%s | ${config.siteName}`,
    },

    description: config.business.description,

    robots: isProduction
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: false },

    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_CM' : 'en_US',
      url: config.siteUrl,
      siteName: config.siteName,
    },

    twitter: {
      card: 'summary_large_image',
      site: config.twitterHandle,
    },

    alternates: {
      canonical: config.siteUrl,
      languages: {
        'fr': `${config.siteUrl}/fr`,
        'en': `${config.siteUrl}/en`,
      },
    },

    verification: {
      google: process.env['NEXT_PUBLIC_GOOGLE_VERIFICATION'],
    },
  };
}

/**
 * Génère le Schema.org JSON-LD pour LocalBusiness.
 * Critique pour le SEO local (Yaoundé, Douala, Cameroun).
 */
export function buildLocalBusinessSchema(config: SeoConfig): string {
  const { business } = config;

  const schema = {
    '@context': 'https://schema.org',
    '@type': business.type,
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.telephone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      addressCountry: business.address.addressCountry,
      postalCode: business.address.postalCode,
    },
    ...(business.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
    }),
    ...(business.openingHours && { openingHoursSpecification: business.openingHours }),
    ...(business.priceRange && { priceRange: business.priceRange }),
    ...(business.servesCuisine && { servesCuisine: business.servesCuisine }),
    ...(business.specialty && { medicalSpecialty: business.specialty }),
    sameAs: [],
  };

  return JSON.stringify(schema);
}
