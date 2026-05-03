import { WindowWithLenis } from '@/types/performance';

type LenisInstance = {
  scrollTo: (target: number | HTMLElement, opts?: object) => void;
};

const DESKTOP_BREAKPOINT = 1024;

const desktopScrollPositions: Record<string, () => number> = {
  experience: () => window.innerHeight,
  projects: () => window.innerHeight * 2,
};

export const smoothScrollTo = (targetId: string): void => {
  const lenis = (window as WindowWithLenis).lenis as LenisInstance | undefined;
  const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
  const scrollOpts = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  };

  if (isDesktop && desktopScrollPositions[targetId]) {
    const position = desktopScrollPositions[targetId]();
    if (lenis) {
      lenis.scrollTo(position, scrollOpts);
    } else {
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
    return;
  }

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  if (lenis) {
    lenis.scrollTo(targetElement, scrollOpts);
  } else {
    window.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
  }
};

export const handleNavigationClick = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onComplete?: () => void
): void => {
  event.preventDefault();
  smoothScrollTo(href.replace('#', ''));
  if (onComplete) setTimeout(onComplete, 100);
};

