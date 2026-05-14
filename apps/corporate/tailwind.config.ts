import type { Config } from 'tailwindcss';
import baseConfig from '@template/config/tailwind';

/**
 * Configuration Tailwind du Template Corporate.
 * Étend la config base avec les spécificités visuelles corporate.
 *
 * Thème: Noir profond #0A0A0A + Blanc cassé + Or discret #C9A84C
 * Inspiration: McKinsey, Deloitte, cabinets d'avocats internationaux
 */
const config: Config = {
  ...baseConfig,
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      // Couleurs spécifiques corporate (en complément des CSS Variables)
      colors: {
        ...baseConfig.theme?.extend?.colors,
        corporate: {
          black: '#0A0A0A',
          'black-soft': '#1A1A1A',
          white: '#F5F5F0',
          'white-pure': '#FFFFFF',
          gold: '#C9A84C',
          'gold-dark': '#B8973B',
          'gold-light': '#D4B96A',
          gray: {
            50: '#FAFAFA',
            100: '#F4F4F4',
            200: '#E8E8E8',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
        },
      },
    },
  },
};

export default config;
