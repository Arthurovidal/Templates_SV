import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // ── Output standalone pour Docker ───────────────────────
  // Crée un build self-contained avec node_modules minimaux
  output: 'standalone',

  // ── Optimisation images ──────────────────────────────────
  images: {
    formats: ['image/avif', 'image/webp'],
    // Tailles optimisées pour mobile-first (marché africain)
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Domaines autorisés pour les images externes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Placeholder flou pendant le chargement (améliore LCP perçu)
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  // ── Compression ─────────────────────────────────────────
  compress: true,

  // ── Telemetry désactivée ─────────────────────────────────
  // Pas d'envoi de données à Next.js (privacy + perf)
  // Alternative: NEXT_TELEMETRY_DISABLED=1 dans .env

  // ── Headers de sécurité ──────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prévient le clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prévient le MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Active le filtre XSS du navigateur
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Force HTTPS (à activer uniquement en production avec SSL)
          // { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Contrôle les informations de référent
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Politique de permissions
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://res.cloudinary.com",
              "connect-src 'self' https://api.resend.com https://www.google-analytics.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // ── Redirections ─────────────────────────────────────────
  async redirects() {
    return [
      // Rediriger / vers /fr (défaut locale)
      {
        source: '/',
        destination: '/fr',
        permanent: false,
      },
    ];
  },

  // ── Experimental (Next.js 15) ────────────────────────────
  experimental: {
    // Optimisation du chargement des packages
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // ── TypeScript strict ────────────────────────────────────
  typescript: {
    ignoreBuildErrors: false,
  },

  // ── ESLint ───────────────────────────────────────────────
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default withNextIntl(nextConfig);
