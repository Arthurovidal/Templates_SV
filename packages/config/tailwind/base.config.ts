import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

/**
 * Configuration Tailwind BASE partagée.
 * Chaque template l'étend en ajoutant ses propres couleurs via CSS Variables.
 * Les couleurs utilisent des variables CSS pour permettre le theming sans JS.
 */
const baseConfig: Omit<Config, 'content'> = {
  darkMode: ['class'],
  theme: {
    extend: {
      // ── Couleurs via CSS Variables ─────────────────────
      // Chaque template définit ces variables dans son globals.css
      // Cela permet un theming complet sans JavaScript
      colors: {
        background: 'hsl(var(--color-background))',
        foreground: 'hsl(var(--color-foreground))',
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          foreground: 'hsl(var(--color-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))',
          foreground: 'hsl(var(--color-secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent))',
          foreground: 'hsl(var(--color-accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--color-muted))',
          foreground: 'hsl(var(--color-muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--color-card))',
          foreground: 'hsl(var(--color-card-foreground))',
        },
        border: 'hsl(var(--color-border))',
        input: 'hsl(var(--color-input))',
        ring: 'hsl(var(--color-ring))',
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive))',
          foreground: 'hsl(var(--color-destructive-foreground))',
        },
      },

      // ── Border radius via CSS Variables ───────────────
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        card: 'var(--radius-card)',
      },

      // ── Fonts via CSS Variables ────────────────────────
      fontFamily: {
        sans: ['var(--font-body)', ...fontFamily.sans],
        display: ['var(--font-display)', ...fontFamily.serif],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },

      // ── Espacement custom ──────────────────────────────
      spacing: {
        'section-y': 'var(--spacing-section-y, 6rem)',
        'section-y-sm': 'var(--spacing-section-y-sm, 4rem)',
      },

      // ── Animations ────────────────────────────────────
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.6s ease-out',
        'fade-down': 'fade-down 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        'scroll-x': 'scroll-x 30s linear infinite',
      },

      // ── Container ─────────────────────────────────────
      maxWidth: {
        'screen-2xl': '1536px',
      },

      // ── Backdrop blur (performances faibles connexions) ──
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default baseConfig;
