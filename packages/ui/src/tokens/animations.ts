import type { Variants } from 'framer-motion';

/**
 * Variants Framer Motion partagés entre tous les templates.
 *
 * Stratégie performance:
 * - Animations CSS-first quand possible (pas besoin de framer-motion)
 * - Framer Motion uniquement pour les animations complexes (scroll-triggered, etc.)
 * - Toujours respecter prefers-reduced-motion (voir useReducedMotion hook)
 * - Durées courtes sur mobile pour ne pas pénaliser les appareils lents
 */

// ──────────────────────────────────────
// FADE
// ──────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ──────────────────────────────────────
// SCALE
// ──────────────────────────────────────

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ──────────────────────────────────────
// STAGGER (liste d'éléments en cascade)
// ──────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// ──────────────────────────────────────
// TEXTE (reveal lettre par lettre)
// ──────────────────────────────────────

export const textContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.012, delayChildren: 0.04 * i },
  }),
};

export const textChild: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
};

// ──────────────────────────────────────
// HOVER (sur les cards)
// ──────────────────────────────────────

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export const cardHoverSubtle = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// ──────────────────────────────────────
// PAGE TRANSITIONS
// ──────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

// ──────────────────────────────────────
// NAVBAR
// ──────────────────────────────────────

export const navbarVariants: Variants = {
  top: { backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' },
  scrolled: {
    backgroundColor: 'rgba(10,10,10,0.85)',
    backdropFilter: 'blur(12px)',
    transition: { duration: 0.3 },
  },
};
