'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ══════════════════════════════════════════════════════════════
// useInView — Déclenche les animations au scroll
// ══════════════════════════════════════════════════════════════

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** Si false, l'animation se déclenche une seule fois */
  triggerOnce?: boolean;
}

/**
 * Détecte si un élément est visible dans le viewport.
 * Utilise IntersectionObserver (natif, performant, pas de JS supplémentaire).
 *
 * @example
 * const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
 * <div ref={ref} className={inView ? 'opacity-100' : 'opacity-0'}>...</div>
 */
export function useInView({
  threshold = 0.15,
  rootMargin = '0px',
  triggerOnce = true,
}: UseInViewOptions = {}): {
  ref: React.RefObject<HTMLDivElement | null>;
  inView: boolean;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView };
}

// ══════════════════════════════════════════════════════════════
// useScrollProgress — Progression du scroll (0 → 1)
// ══════════════════════════════════════════════════════════════

/**
 * Retourne la progression du scroll de la page (0 = top, 1 = bottom).
 * Utile pour les barres de progression ou effets parallax.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}

// ══════════════════════════════════════════════════════════════
// useReducedMotion — Respecte prefers-reduced-motion
// ══════════════════════════════════════════════════════════════

/**
 * Détecte si l'utilisateur préfère les animations réduites.
 * CRITIQUE pour l'accessibilité et les performances sur appareils lents.
 *
 * @example
 * const reducedMotion = useReducedMotion();
 * const variants = reducedMotion ? simpleVariants : complexVariants;
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// ══════════════════════════════════════════════════════════════
// useMediaQuery — Breakpoints responsive
// ══════════════════════════════════════════════════════════════

const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  mobile: '(max-width: 767px)',
  touch: '(hover: none) and (pointer: coarse)',
} as const;

type Breakpoint = keyof typeof breakpoints;

/**
 * Détecte un breakpoint responsive.
 * Évite les calculs CSS inutiles en JavaScript.
 *
 * @example
 * const isMobile = useMediaQuery('mobile');
 * const isDesktop = useMediaQuery('lg');
 */
export function useMediaQuery(breakpoint: Breakpoint | string): boolean {
  const query = breakpoints[breakpoint as Breakpoint] ?? breakpoint;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// ══════════════════════════════════════════════════════════════
// useScrollDirection — Direction du scroll (pour navbar hide/show)
// ══════════════════════════════════════════════════════════════

/**
 * Détecte la direction du scroll.
 * Utile pour cacher la navbar au scroll down et la montrer au scroll up.
 */
export function useScrollDirection(): 'up' | 'down' | 'top' {
  const [direction, setDirection] = useState<'up' | 'down' | 'top'>('top');
  const lastScrollY = useRef(0);

  const updateDirection = useCallback(() => {
    const currentY = window.scrollY;

    if (currentY < 80) {
      setDirection('top');
    } else if (currentY > lastScrollY.current) {
      setDirection('down');
    } else {
      setDirection('up');
    }

    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateDirection);
  }, [updateDirection]);

  return direction;
}
